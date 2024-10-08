import { SocialConnectionService } from '@/services/SocialConnectionService'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { ConnectionService } from '@/services/ConnectionService'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import db from '@/lib/db'
import sharp from 'sharp'
import S3Service from '@/lib/S3Service'

// change to tiktok tracking

export async function POST(req: Request, res: Response) {
  const { creators, tags, campaignId } = await req.json()

  const session = await getServerSession(authOptions)
  const sessionId = session?.user.id

  interface PostData {
    id: string
    media_type: string
    caption: string
    media_url: string
    permalink: string
    shortcode: string
    thumbnail_url: string

    reach: number
    comments: number
    likes: number
    impressions: number
    saved: number
    shares: number

    plays: number
    video_views: number
  }

  function extractPostData(data: any[]): PostData[] {
    const postArray: PostData[] = []

    for (const post of data) {
      const insights = post.insights.data
      const postData: PostData = {
        id: post.id,
        media_type: post.media_type,

        caption: post.caption,
        media_url: post.media_url,
        permalink: post.permalink,
        shortcode: post.shortcode,
        thumbnail_url: post.thumbnail_url,

        reach:
          insights.find((insight: any) => insight.name === 'reach')?.values[0]
            .value || 0,
        comments:
          insights.find((insight: any) => insight.name === 'comments')
            ?.values[0].value || 0,
        likes:
          insights.find((insight: any) => insight.name === 'likes')?.values[0]
            .value || 0,
        impressions:
          insights.find((insight: any) => insight.name === 'impressions')
            ?.values[0].value || 0,
        saved:
          insights.find((insight: any) => insight.name === 'saved')?.values[0]
            .value || 0,
        shares:
          insights.find((insight: any) => insight.name === 'shares')?.values[0]
            .value || 0,
        plays:
          insights.find((insight: any) => insight.name === 'plays')?.values[0]
            .value || 0,
        video_views:
          insights.find((insight: any) => insight.name === 'video_views')
            ?.values[0].value || 0,
      }
      postArray.push(postData)
    }
    return postArray
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

  for (const page of creators) {
    const response = await fetch(
      `https://graph.facebook.com/v17.0/${page.id}/media?fields=id,media_type,caption,media_url,cover_url,permalink,shortcode,thumbnail_url,insights.metric(comments,likes,impressions,reach,saved,shares,plays)&access_token=${page.token}`,
    )

    const posts = await response.json()

    const postData = Array.isArray(posts.data)
      ? extractPostData(posts.data)
      : []

    for (const post of postData) {
      const containsHashtag = tags.some((tag: any) =>
        post.caption.includes(tag),
      )

      let mediaUrlToUse
      let isThumbnail = false

      if (post.media_type === 'VIDEO') {
        mediaUrlToUse = post.thumbnail_url
        isThumbnail = true
      } else {
        mediaUrlToUse = post.media_url
      }
      const UploadedMediaUrl = await imageFromS3(
        mediaUrlToUse,
        post.permalink,
        isThumbnail,
      )


      if (containsHashtag) {
        const postExists = await db.post.findFirst({
          where: {
            shortcode: post.shortcode,
            userId: String(sessionId),
          },
        })

        const creator = await db.creator.upsert({
          where: {
            username_platform: {
              username: page.username,
              platform: 'instagram',
            },
          },
          create: {
            username: page.username,
            platform: 'instagram',
            uuid: page.id,
            users: {
              connect: {
                id: String(sessionId),
              },
            },
          },
          update: {
            uuid: page.id,
            users: {
              connect: {
                id: String(sessionId),
              },
            },
          },
        })

        if (postExists) {
          const postToSave = await db.post.upsert({
            where: {
              id: postExists!.id,
              shortcode: String(post.shortcode),
              platform: 'instagram',
            },
            create: {
              platform: 'instagram',
              permalink: post.permalink,
              shortcode: post.shortcode,
              imageUrl: UploadedMediaUrl,
              campaignId: campaignId,

              creatorId: creator.id,
              caption: post.caption,
              userId: String(sessionId),
              uuid: post.id,

              engagementCount:
                ((post.likes + post.shares + post.saved + post.comments) /
                  creator.followersCount!) *
                100,
              reachCount: post.reach,
              sharesCount: post.shares,
              commentsCount: post.comments,
              playsCount: post.plays,
              savesCount: post.saved,
              likesCount: post.likes,
            },
            update: {
              platform: 'instagram',
              permalink: String(post.permalink),
              shortcode: String(post.shortcode),
              imageUrl: UploadedMediaUrl,
              campaignId: campaignId,

              creatorId: creator.id,
              caption: String(post.caption),
              userId: String(sessionId),

              reachCount: post.reach,
              sharesCount: post.shares,
              commentsCount: post.comments,
              playsCount: post.plays,
              savesCount: post.saved,
              likesCount: post.likes,
            },
          })
        } else {
          const postToSave = await db.post.create({
            data: {
              platform: 'instagram',
              permalink: String(post.permalink),
              shortcode: String(post.shortcode),
              imageUrl: UploadedMediaUrl,
              campaignId: campaignId,

              creatorId: creator.id,
              caption: String(post.caption),
              userId: String(sessionId),
              uuid: post.id,

              reachCount: post.reach,
              sharesCount: post.shares,
              commentsCount: post.comments,
              playsCount: post.plays,
              savesCount: post.saved,
              likesCount: post.likes,
            },
          })
        }

        const showPost = () => {
          console.log('Caption:', post.caption)
          console.log('Media URL:', post.media_url)
          console.log('Permalink:', post.permalink)
          console.log('Shortcode:', post.shortcode)
          console.log('Comments:', post.comments)
          console.log(
            'Engagement:',
            ((post.likes + post.shares + post.saved + post.comments) /
              creator.followersCount!) *
              100,
          )
          console.log('Likes:', post.likes)
          console.log('Impressions:', post.impressions)
          console.log('Saved:', post.saved)
          console.log('Shares:', post.shares)
          console.log('Plays:', post.plays)
          console.log('-----------------------------')
        }

        showPost()
      }
    }

    const stories = await fetch(
      `https://graph.facebook.com/v14.0/${page.id}/stories?access_token=${page.token}`,
    ).then(res => res.json())

    for (const story of stories.data) {
      const data = await fetch(
        `https://graph.facebook.com/v18.0/${story.id}?fields=id,media_type,media_url,permalink,caption,username,owner,collaborators,thumbnail_url,is_shared_to_feed,media_product_type&access_token=${page.token}`,
      ).then(res => res.json())

      const containsHashtag = tags.some((tag: any) =>
        data.caption.includes(tag),
      )

      let mediaUrlToUse
      let isThumbnail = false

      if (data.media_type === 'VIDEO') {
        mediaUrlToUse = data.thumbnail_url
        isThumbnail = true
      } else {
        mediaUrlToUse = data.media_url
      }
      const storyUploadedImageUrl = await imageFromS3(
        mediaUrlToUse,
        data.permalink,
        isThumbnail,
      )


      if (containsHashtag) {
        const navigation = await fetch(
          `https://graph.facebook.com/v17.0/${story.id}/insights/?metric=navigation&breakdown=story_navigation_action_type&access_token=${page.token}`,
        ).then(res => res.json())

        const insights = await fetch(
          `https://graph.facebook.com/v18.0/${story.id}/insights/?metric=profile_activity,impressions,reach,replies,shares,profile_visits,follows&access_token=${page.token}`,
        ).then(res => res.json())

        if (navigation?.error?.message || insights?.error?.message) {
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
                userId: String(sessionId),
                campaignId: campaignId,

                // meter creator ID
                imageUrl: storyUploadedImageUrl,
                username: data.username,
                permalink: data.permalink,
              },
            })
          } else {
            const story = await db.story.create({
              data: {
                uuid: data.id,
                userId: String(sessionId),
                campaignId: campaignId,
                imageUrl: storyUploadedImageUrl,
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
                imageUrl: storyUploadedImageUrl,
                userId: String(sessionId),
                username: data.username,
                campaignId: campaignId,

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
                userId: String(sessionId),
                imageUrl: storyUploadedImageUrl,
                username: data.username,
                campaignId: campaignId,

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
    }

    return NextResponse.json({ kelo: 'j' })
  }
}
