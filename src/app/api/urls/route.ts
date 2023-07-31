import db from '@/lib/db'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import S3Service from '@/lib/S3Service'
import InstagramService from '@/lib/InstagramService'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const { posts, campaignId } = (await req.json()) as {
    posts: string | string[]
    campaignId: string
  }

  const postsArray = Array.isArray(posts) ? posts : posts.split(',')

  for (const post of postsArray) {
    if (post.includes('instagram')) {
      const shortcode = await InstagramService.getShortcode(post.trim())
      const oembed = await InstagramService.getPostInfo(shortcode)

      const creatorInDb = await db.creator.findFirst({
        where: {
          username: oembed?.author_name,
        },
      })

      let res = creatorInDb?.accessToken
        ? await InstagramService.getPrivateInstagramData(
            creatorInDb.uuid,
            creatorInDb.accessToken,
          )
        : await InstagramService.getPublicInstagramData(
            oembed?.author_name || '',
          )

      if (!res) {
        console.log('ERROR No Res')
        continue
      }

      const profileUrl = await fetch(res.profile_picture_url!).then(res =>
        res.blob(),
      )
      const profileImageUrl = await S3Service.uploadCreatorImage(
        profileUrl,
        res.id!,
      )

      console.log(profileImageUrl)

      const creator = await db.creator.upsert({
        where: {
          uuid: res.id!,
        },
        update: {
          campaigns: {
            connect: {
              id: +campaignId,
            },
          },
          platform: 'instagram',
          followersCount: res.followers_count!,
          users: {
            connect: {
              id: session!.user.id,
            },
          },
          imageUrl: profileImageUrl,
          username: res.username!,
        },
        create: {
          uuid: res.id!,
          campaigns: {
            connect: {
              id: +campaignId,
            },
          },
          platform: 'instagram',
          followersCount: res.followers_count!,
          users: {
            connect: {
              id: session!.user.id,
            },
          },
          imageUrl: profileImageUrl,
          username: res.username!,
        },
      })

      if (!creator) {
        console.log('Creator not found')
        continue
      }

      const postOnRes = res.media?.data?.find(
        media => media.permalink?.includes(shortcode),
      )

      if (!postOnRes) {
        console.log('Post not found')
        continue
      }

      const thumbnail = await fetch(oembed?.thumbnail_url!).then(res =>
        res.blob(),
      )

      const thumbnail_url = await S3Service.uploadPostObject(
        thumbnail,
        postOnRes.id!,
      )

      let media_url = thumbnail_url
      if (postOnRes.media_url && postOnRes.media_url.includes('.mp4')) {
        const video = await fetch(postOnRes.media_url!).then(res => res.blob())
        media_url = await S3Service.uploadPostObject(video, postOnRes.id!)
      }

      const postInsights = InstagramService.getInsights(postOnRes)

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
          imageUrl: thumbnail_url,
          mediaUrl: media_url ?? thumbnail_url,
          commentsCount: postInsights.commentsCount,
          likesCount: postInsights.likesCount,
          reachCount: postInsights.reachCount,
          engagementCount: postInsights.engagementCount,
          impressionsCount: postInsights.impressionsCount,
          playsCount: postInsights.playsCount,
          savesCount: postInsights.savesCount,
          sharesCount: postInsights.sharesCount,
          shortcode: shortcode,
        },
        create: {
          caption: postOnRes.caption || null,
          uuid: postOnRes.id!,
          campaignId: +campaignId,
          userId: session!.user.id,
          permalink: postOnRes.permalink!,
          creatorId: creator.id,
          imageUrl: thumbnail_url,
          mediaUrl: media_url ?? thumbnail_url,
          commentsCount: postInsights.commentsCount,
          likesCount: postInsights.likesCount,
          reachCount: postInsights.reachCount,
          engagementCount: postInsights.engagementCount,
          impressionsCount: postInsights.impressionsCount,
          playsCount: postInsights.playsCount,
          savesCount: postInsights.savesCount,
          sharesCount: postInsights.sharesCount,
          shortcode: shortcode,
        },
      })

      if (!postToSave) {
        console.log('Post not saved')
        continue
      }
      console.log(`Post ${post.trim()} saved to db`)
    }

    if (post.includes('tiktok')) {
      console.log(`${post.trim()} is a tiktok link`)
    }
  }

  return NextResponse.json('ok')
}
