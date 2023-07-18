import db from '@/lib/db'
import { BussinesDiscoveryRes } from '@/types/businessDiscovery/BussinesDiscoveryRes'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const { posts, campaignId } = (await req.json()) as {
    posts: string
    campaignId: string
  }

  const postsArray = posts.split(',').map(post => post.split('/')[4]!)

  for (const post of postsArray) {
    const oemBedUrl = new URL(
      `https://graph.facebook.com/${process.env.FACEBOOK_GRAPH_VERSION}/instagram_oembed`,
    )
    oemBedUrl.searchParams.append('url', `https://www.instagram.com/p/${post}/`)
    oemBedUrl.searchParams.append(
      'access_token',
      process.env.BUSINESS_TOKEN_SOPHIA!,
    )

    const oemBedResponse = await fetch(oemBedUrl.toString()).then(res =>
      res.json(),
    )

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

    if (!res.business_discovery) {
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
        reachCount: 0,
        engagementCount: 0,
        impressionsCount: 0,
        playsCount: 0,
        savesCount: 0,
        sharesCount: 0,
        shortcode: post,
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
        reachCount: 0,
        engagementCount: 0,
        impressionsCount: 0,
        playsCount: 0,
        savesCount: 0,
        sharesCount: 0,
        shortcode: post,
      },
    })

    console.log(postToSave)
  }

  return NextResponse.json(postsArray)
}
