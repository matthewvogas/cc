import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import db from '@/lib/db'
import { hashtagSearch } from '../instagram/ig_hashtag_search/route'
import { Post } from '@prisma/client'
import { isMp4 } from '@/utils/ValidationsHelper'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const campaigns = await CampaignsService.findMany(session!.user.id)
    return NextResponse.json(campaigns)
  } catch (err) {
    console.log(err)
    return NextResponse.json(err, {
      status: 500,
    })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    // if (!session)
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const { name, description, clientId, title, hashtag } = await req.json()

    console.log({ name, description, clientId, hashtag, title })

    const campaign = await db.campaign.create({
      data: {
        name,
        description,
        clientId: parseInt(clientId) || null,
        userId: session!.user.id,
      },
    })

    if (title === 'new hashtag campaign') {
      if (!hashtag) throw new Error('Hashtag is required')
      const hashtagId = await hashtagSearch(hashtag)
      console.log({ hashtagId })
      if (!hashtagId) throw new Error('Hashtag not found')

      const url: URL = new URL(
        `https://graph.facebook.com/v16.0/${hashtagId}/top_media`,
      )
      url.searchParams.append('user_id', '17841447832021774')
      url.searchParams.append(
        'fields',
        'id,caption,media_type,comments_count,like_count,media_url,permalink',
      )
      url.searchParams.append(
        'access_token',
        'EAAR5U6jL0JcBAFG9unBeqjKdZBVCaBs2veaRw4dChUYZCweyVV47c1J96F5ZAVZCywvpaeVBaNhXpXwN1CpBH74GW1BoLhpX2kRuxht5uSmVj7u9wJ6mLtAdlprBxGNXf16elTuo7VPfM9ZCd1BJHJ3EwGcLmacgwumCa2ZCZAILZAV4O98Y6Eu9',
      )

      const res = await fetch(url).then(res => res.json())
      const posts = res.data
      const formatedPosts = posts.map((post: any) => {
        return {
          caption: post.caption || null,
          commentsCount: post.comments_count || null,
          campaignId: campaign.id,
          likesCount: post.like_count || null,
          mediaProductType: post.media_product_type || null,
          mediaType: post.media_type || null,
          permalink: post.permalink || null,
          shortcode: post.shortcode || null,
          imageUrl: (!isMp4(post.media_url) && post.media_url) || null,
          videoUrl: (isMp4(post.media_url) && post.media_url) || null,
          igId: post.id || null,
          username: post.username || null,
          followersCount: null,
          engagementCount:
            post?.insights?.data?.find(
              (insight: any) => insight.name === 'engagement',
            )?.values[0]?.value || null,
          impressionsCount:
            post?.insights?.data?.find(
              (insight: any) => insight.name === 'impressions',
            )?.values[0]?.value || null,
          reachCount:
            post?.insights?.data?.find(
              (insight: any) => insight.name === 'reach',
            )?.values[0]?.value || null,
          savesCount:
            post?.insights?.data?.find(
              (insight: any) => insight.name === 'saved',
            )?.values[0]?.value || null,
          sharesCount:
            post?.insights?.data?.find(
              (insight: any) => insight.name === 'shares',
            )?.values[0]?.value || null,
        }
      })

      await db.post.createMany({
        data: formatedPosts,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      },
    )
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, description } = await req.json()
    await db.campaign.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      },
    )
  }
}
