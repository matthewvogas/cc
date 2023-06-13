import db from '@/lib/db'
import { formatExcelData } from '@/utils/ExcelHelper'
import { isMp4 } from '@/utils/ValidationsHelper'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session) return NextResponse.json({ message: 'No session' })

  try {
    const { data, campaignId } = await req.json()
    const formatedData = formatExcelData(data)

    const postsToDb = []
    for (const posts of formatedData) {
      console.log(`getting ${posts.username} data`)
      const instagramRes = await fetch(
        `https://graph.facebook.com/${process.env.BUSINESS_ID}?fields=business_discovery.username(${posts.username}){followers_count,media_count,media.limit(500){comments_count,like_count,permalink,media_url},follows_count}&access_token=${process.env.BUSINESS_TOKEN}`,
      ).then(res => res.json())
      const followers = instagramRes.business_discovery?.followers_count
      const instagramPosts = instagramRes.business_discovery.media.data

      const postsToSave = instagramPosts
        .filter((post: any) => {
          return posts.permalinks.includes(post.permalink)
        })
        .map((post: any) => {
          return {
            caption: post.caption || null,
            commentsCount: post.comments_count || null,
            campaignId: parseInt(campaignId),
            likesCount: post.like_count || null,
            mediaProductType: post.media_product_type || null,
            mediaType: post.media_type || null,
            permalink: post.permalink || null,
            shortcode: post.shortcode || null,
            imageUrl: (!isMp4(post.media_url) && post.media_url) || null,
            videoUrl: (isMp4(post.media_url) && post.media_url) || null,
            igId: post.id || null,
            username: posts.username || null,
            followersCount: followers || null,
            engagementCount:
              post.insights?.data?.find(
                (insight: any) => insight.name === 'engagement',
              )?.values[0]?.value || null,
            impressionsCount:
              post.insights?.data?.find(
                (insight: any) => insight.name === 'impressions',
              )?.values[0]?.value || null,
            reachCount:
              post.insights?.data?.find(
                (insight: any) => insight.name === 'reach',
              )?.values[0]?.value || null,
            savesCount:
              post.insights?.data?.find(
                (insight: any) => insight.name === 'saved',
              )?.values[0]?.value || null,
            sharesCount:
              post.insights?.data?.find(
                (insight: any) => insight.name === 'shares',
              )?.values[0]?.value || null,
          }
        })

      postsToDb.push(...postsToSave)
    }

    await db.$transaction(
      postsToDb.map(post =>
        db.post.upsert({
          where: { igId: post.igId },
          update: { ...post },
          create: { ...post },
        }),
      ),
    )

    return NextResponse.json({ message: 'ok' })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'error' })
  }
}
