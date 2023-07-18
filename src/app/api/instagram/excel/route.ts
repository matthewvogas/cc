import db from '@/lib/db'
import { BussinesDiscoveryRes } from '@/types/businessDiscovery/BussinesDiscoveryRes'
import { formatExcelData } from '@/utils/ExcelHelper'
import { isMp4 } from '@/utils/ValidationsHelper'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

type postsFromExcel = {
  username: string
  link: string
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  console.log(session!.user.id)
  if (!session) return NextResponse.json({ message: 'No session' })

  try {
    const { data, campaignId } = (await req.json()) as {
      data: postsFromExcel[]
      campaignId: string
    }

    const postsShortCode = data.map(post => post.link.split('/')[4]!)

    for (const post of postsShortCode){
      const oemBedUrl = new URL(`https://graph.facebook.com/${process.env.FACEBOOK_GRAPH_VERSION}/instagram_oembed`)
      oemBedUrl.searchParams.append('url', `https://www.instagram.com/p/${post}/`)
      oemBedUrl.searchParams.append('access_token', process.env.BUSINESS_TOKEN_SOPHIA!)

      const oemBedResponse = await fetch(oemBedUrl.toString()).then(res => res.json())

      if (oemBedResponse.error) {
        console.log(oemBedResponse.error)
        return
      }

      const publicResUrl = new URL(
        `https://graph.facebook.com/${process.env.BUSINESS_SOPHIA}`,
      )
      publicResUrl.searchParams.append(
        'fields',
        `business_discovery.username(${oemBedResponse.author_name}){followers_count,username,name,profile_picture_url,media_count,media.limit(500){caption,media_url,permalink,comments_count,like_count}}`,
      )
      publicResUrl.searchParams.append(
        'access_token',
        process.env.BUSINESS_TOKEN!,
      )

      const res = (await fetch(publicResUrl.toString()).then(res =>
        res.json(),
      )) as BussinesDiscoveryRes

      if (!res.business_discovery){
        console.log(res)
        return
      }

      const creator = await db.creator.upsert({
        where: {
          uuid: res.business_discovery.id!,
        },
        update: {
          campaigns: {
            connect: {
              id: +campaignId,
            },
          },
          platform: 'instagram',
          followersCount: res.business_discovery.followers_count!,
          users: {
            connect: {
              id: session!.user.id,
            },
          },
          imageUrl: res.business_discovery.profile_picture_url!,
          username: res.business_discovery.username!,
        },
        create: {
          uuid: res.business_discovery.id!,
          campaigns: {
            connect: {
              id: +campaignId,
            },
          },
          platform: 'instagram',
          followersCount: res.business_discovery.followers_count!,
          users: {
            connect: {
              id: session!.user.id,
            },
          },
          imageUrl: res.business_discovery.profile_picture_url!,
          username: res.business_discovery.username!,
        },
      })

      const postOnRes = res.business_discovery.media?.data?.find(
        media => media.permalink?.includes(post),
      )

      if (!postOnRes) {
        console.log('Post not found')
        return
      }

      const postToSave = await db.post.upsert({
        where: {
          uuid: postOnRes.id!,
        },
        update: {
          caption: postOnRes.caption || null,
          uuid: postOnRes.id!,
          campaignId: +campaignId,
          userId: session!.user.id,
          permalink: postOnRes.permalink!,
          creatorId: creator.id,
          imageUrl: oemBedResponse.thumbnail_url,
          mediaUrl: postOnRes.media_url!,
          commentsCount: postOnRes.comments_count ?? 0,
          likesCount: postOnRes.like_count ?? 0,
        },
        create: {
          caption: postOnRes.caption || null,
          uuid: postOnRes.id!,
          campaignId: +campaignId,
          userId: session!.user.id,
          permalink: postOnRes.permalink!,
          creatorId: creator.id,
          imageUrl: oemBedResponse.thumbnail_url,
          mediaUrl: postOnRes.media_url!,
          commentsCount: postOnRes.comments_count ?? 0,
          likesCount: postOnRes.like_count ?? 0,
        },
      })

      console.log(postToSave)
    }

    return NextResponse.json({ message: 'ok' })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'error' })
  }
}
