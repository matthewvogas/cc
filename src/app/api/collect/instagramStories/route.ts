import S3Service from '@/lib/S3Service'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { SocialConnectionService } from '@/services/SocialConnectionService'
import { authOptions } from '../../auth/[...nextauth]/route'
import sharp from 'sharp'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const token = await SocialConnectionService.findInstagramToken(
    session!.user.id,
  )

  async function imageFromS3(url: RequestInfo | URL, permalink: any) {
    const image = await fetch(url).then(r => r.blob());
    const name = String(permalink) + new Date().getTime();
    const buffer = Buffer.from(await image.arrayBuffer())
    const resized = await sharp(buffer)
      .webp({ quality: 80 })
      .resize(300, 300)
      .toBuffer()
    const blob = new Blob([resized], { type: 'image/webp' })

    return await S3Service.uploadObject(
      blob,
      name,
      'campaigns',
      'images',
    )
  }

  try {
    const { searchParams } = new URL(req.url)
    const { pageId } = await req.json()

    const stories = await fetch(
      `https://graph.facebook.com/v14.0/${pageId}/stories?access_token=${token}`,
    ).then(res => res.json())

    for (const story of stories.data) {
      const data = await fetch(
        `https://graph.facebook.com/v18.0/${story.id}?fields=id,media_type,media_url,permalink,caption,username,owner,collaborators,thumbnail_url,is_shared_to_feed,media_product_type&access_token=${token}`,
      ).then(res => res.json())

      const navigation = await fetch(
        `https://graph.facebook.com/v17.0/${story.id}/insights/?metric=navigation&breakdown=story_navigation_action_type&access_token=${token}`,
      ).then(res => res.json())

      const insights = await fetch(
        `https://graph.facebook.com/v18.0/${story.id}/insights/?metric=profile_activity,impressions,reach,replies,shares,profile_visits,follows&access_token=${token}`,
      ).then(res => res.json())

      const UploadedImageUrl = await imageFromS3(data.thumbnail_url, data.permalink);
      const UploadedMediaUrl = await imageFromS3(data.media_url, data.permalink);

      if (navigation?.error?.message || insights?.error?.message) {
        console.log(`Data:`)
        console.log(`Creator IG ID: ${data.id}`)
        console.log(`Image: ${data.media_url || data.thumbnail_url}`)
        console.log(`Username: ${data.username}`)
        console.log(`Perma Link: ${data.permalink}`)
        console.log('------')

        const findStory = await db.story.findFirst({
          where: {
            uuid: data.id,
          },
        })

        if (findStory) {
          const story = await db.story.update({
            where: {
              id: findStory.id,
            },
            data: {
              uuid: data.id,
              userId: session.user.id,
              // meter creator ID
              imageUrl: UploadedMediaUrl || UploadedImageUrl,
              username: data.username,
              permalink: data.permalink,
            },
          })
        } else {
          const story = await db.story.create({
            data: {
              uuid: data.id,
              userId: session.user.id,
              // meter creator ID
              imageUrl: UploadedMediaUrl || UploadedImageUrl,
              username: data.username,
              permalink: data.permalink,
            },
          })
        }

      } else {
        const getValueByName = (name: string): number => {
          const item = insights.data.find((item: any) => item.name === name)
          return item ? item.values[0].value : 0
        }

        const breakdowns = navigation.data[0].total_value.breakdowns[0].results

        const getValueByActionType = (actionType: string) => {
          const item = breakdowns.find((item: any) =>
            item.dimension_values.includes(actionType),
          )
          return item ? item.value : 0
        }

        const impressions = getValueByName('impressions')
        const reach = getValueByName('reach')
        const replies = getValueByName('replies')
        const profileActivity = getValueByName('profile_activity')
        const shares = getValueByName('shares')
        const profileVisits = getValueByName('profile_visits')
        const follows = getValueByName('follows')
        const tapBack = getValueByActionType('tap_back')
        const swipeForward = getValueByActionType('swipe_forward')
        const tapExit = getValueByActionType('tap_exit')
        const tapForward = getValueByActionType('tap_forward')

        const findStory = await db.story.findFirst({
          where: {
            uuid: data.id,
          },
        })

        if (findStory) {

          const story = await db.story.update({
            where: {
              id: findStory.id,
            },
            data: {
              uuid: data.id,
              imageUrl: UploadedMediaUrl || UploadedImageUrl,
              userId: session.user.id,
              username: data.username,
              // meter creator ID
              permalink: data.permalink,
              profile_activity: profileActivity,
              impressions: impressions,
              reach: reach,
              replies: replies,
              shares: shares,
              profile_visits: profileVisits,
              follows: follows,
              tapBack: tapBack,
              swipeForward: swipeForward,
              tapExit: tapExit,
              tapForward: tapForward,
            },
          })

        } else {

          const story = await db.story.create({
            data: {
              uuid: data.id,
              userId: session.user.id,
              imageUrl: UploadedMediaUrl || UploadedImageUrl,
              username: data.username,
              // meter creator ID
              permalink: data.permalink,
              profile_activity: profileActivity,
              impressions: impressions,
              reach: reach,
              replies: replies,
              shares: shares,
              profile_visits: profileVisits,
              follows: follows,
              tapBack: tapBack,
              swipeForward: swipeForward,
              tapExit: tapExit,
              tapForward: tapForward,
            },
          })
        }


        console.log(`With More Data`)
        console.log(`Creator IG ID: ${data.id}`)
        console.log(`Image: ${data.media_url || data.thumbnail_url}`)
        console.log(`Username: ${data.username}`)
        console.log(`Perma Link: ${data.permalink}`)
        console.log(`profile_activity: ${profileActivity}`)
        console.log(`impressions: ${impressions}`)
        console.log(`reach: ${reach}`)
        console.log(`replies: ${replies}`)
        console.log(`shares: ${shares}`)
        console.log(`profile_visits: ${profileVisits}`)
        console.log(`follows: ${follows}`)
        console.log(`Tap Back: ${tapBack}`)
        console.log(`Swipe Forward: ${swipeForward}`)
        console.log(`Tap Exit: ${tapExit}`)
        console.log(`Tap Forward: ${tapForward}`)
        console.log('----------------------')
      }
    }

    return NextResponse.json({ data: 'done' })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
