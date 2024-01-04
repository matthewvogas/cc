import S3Service from '@/lib/S3Service'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { SocialConnectionService } from '@/services/SocialConnectionService'
import { authOptions } from '../../../auth/[...nextauth]/route'
import sharp from 'sharp'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  async function imageFromS3(
    url: RequestInfo | URL,
    permalink: string,
    isThumbnail: boolean = false,
  ): Promise<any> {
    try {
      console.log(url, 'URL being processed')

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const contentType = response.headers.get('content-type')
      if (!contentType) {
        throw new Error('Failed to retrieve content type')
      }

      let buffer: Buffer

      if (
        contentType.startsWith('image/') ||
        (isThumbnail && contentType.startsWith('video/'))
      ) {
        const media = await response.blob()
        buffer = Buffer.from(await media.arrayBuffer())
      } else {
        throw new Error('Unsupported content type: ' + contentType)
      }

      const resized = await sharp(buffer)
        .webp({ quality: 80 })
        .resize(300, 300)
        .toBuffer()
      const blob = new Blob([resized], { type: 'image/webp' })

      let objectKey = String(permalink) + new Date().getTime()
      if (isThumbnail) {
        objectKey += '_thumbnail'
      }

      return await S3Service.uploadObject(
        blob,
        objectKey,
        'campaigns',
        'images',
      )
    } catch (error) {
      console.error('Error processing file: ', error)
      throw error
    }
  }


  try {
    const { creators, tags, campaignId } = await req.json()

    for (const creator of creators) {
      const stories = await fetch(
        `https://graph.facebook.com/v14.0/${creator.id}/stories?access_token=${creator.token}`,
      ).then(res => res.json())

      for (const story of stories.data) {
        const data = await fetch(
          `https://graph.facebook.com/v18.0/${story.id}?fields=id,media_type,media_url,permalink,caption,username,owner,collaborators,thumbnail_url,is_shared_to_feed,media_product_type&access_token=${creator.token}`,
        ).then(res => res.json())

        const navigation = await fetch(
          `https://graph.facebook.com/v17.0/${story.id}/insights/?metric=navigation&breakdown=story_navigation_action_type&access_token=${creator.token}`,
        ).then(res => res.json())

        const insights = await fetch(
          `https://graph.facebook.com/v18.0/${story.id}/insights/?metric=profile_activity,impressions,reach,replies,shares,profile_visits,follows&access_token=${creator.token}`,
        ).then(res => res.json())

        if (navigation?.error?.message || insights?.error?.message) {
          console.log(`Data:`)
          console.log(`Creator IG ID: ${data.id}`)
          console.log(`Image: ${data.media_url || data.thumbnail_url}`)
          console.log(`Username: ${data.username}`)
          console.log(`Perma Link: ${data.permalink}`)
          console.log(`Caption: ${data.caption}`)
          console.log('------')

          let mediaUrlToUse
          let isThumbnail = false
    
          if (data.media_type === 'VIDEO') {
            mediaUrlToUse = data.thumbnail_url
            isThumbnail = true
          } else {
            mediaUrlToUse = data.media_url
          }
          const UploadedMediaUrl = await imageFromS3(
            mediaUrlToUse,
            data.permalink,
            isThumbnail,
          )


          if (data.caption) {
            const containsTag = tags.some(
              (tag: any) => data.caption?.includes(tag),
            )

            if (containsTag) {
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
                    imageUrl: UploadedMediaUrl,
                    username: data.username,
                    permalink: data.permalink,
                    campaignId: campaignId,
                  },
                })
              } else {
                const story = await db.story.create({
                  data: {
                    uuid: data.id,
                    userId: session.user.id,
                    // meter creator ID
                    imageUrl: UploadedMediaUrl,
                    username: data.username,
                    permalink: data.permalink,
                    campaignId: campaignId,
                  },
                })
              }
            } else {
              const getValueByName = (name: string): number => {
                const item = insights.data.find(
                  (item: any) => item.name === name,
                )
                return item ? item.values[0].value : 0
              }

              const breakdowns =
                navigation.data[0].total_value.breakdowns[0].results

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
                    imageUrl: UploadedMediaUrl,
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
                    campaignId: campaignId,
                  },
                })
              } else {
                const story = await db.story.create({
                  data: {
                    uuid: data.id,
                    userId: session.user.id,
                    imageUrl: UploadedMediaUrl,
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
                    campaignId: campaignId,
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

            // finalizar guardado
          } else {
            console.log(
              'Story does not contain the required hashtags, skipping save.',
            )
          }
        }
      }
    }

    return NextResponse.json({ data: 'done' })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
