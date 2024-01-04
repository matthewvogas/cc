import { InstagramPagesService } from '@/services/InstagramPagesService'
import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import S3Service from '@/lib/S3Service'
import sharp from 'sharp'

export async function POST(req: NextRequest) {
  const { sessionId, instagramPage, instgramToken, postLimit } =
    await req.json()

  const page = await InstagramPagesService.findUnique(instagramPage)

  async function imageFromS3(
    url: RequestInfo | URL,
    permalink: string,
    isThumbnail: boolean = false,
  ): Promise<any> {
    try {

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

  interface PostData {
    id: string
    media_type: string
    caption: string
    media_url: string
    permalink: string
    shortcode: string
    thumbnail_url: string

    reach: number
    // engagement: number
    comments: number
    likes: number
    impressions: number
    saved: number
    shares: number

    // video
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

  try {
    const posts = await fetch(
      `https://graph.facebook.com/v17.0/${instagramPage}/media?fields=id,media_type,caption,media_url,cover_url,permalink,shortcode,thumbnail_url,insights.metric(comments,likes,impressions,reach,saved,shares,plays)&access_token=${instgramToken}&limit=${postLimit}`,
    ).then(res => res.json())

    const postDataArray = Array.isArray(posts.data)
      ? extractPostData(posts.data)
      : []

    for (const post of postDataArray) {
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

      const creator = await db.creator.findFirst({
        where: {
          username: page[0].username,
        },
      })

      const postExists = await db.post.findFirst({
        where: {
          shortcode: post.shortcode,
          userId: sessionId,
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

            // data
            creatorId: creator?.id,
            caption: post.caption,
            userId: sessionId,
            uuid: post.id,

            // insighst
            engagementCount:
              ((post.likes + post.shares + post.saved + post.comments) /
                creator?.followersCount!) *
              100,
            reachCount: post.reach,
            sharesCount: post.shares,
            commentsCount: post.comments,
            playsCount: post.plays,
            savesCount: post.saved,
            likesCount: post.likes,
          },
          update: {
            // urls
            platform: 'instagram',
            permalink: String(post.permalink),
            shortcode: String(post.shortcode),
            imageUrl: UploadedMediaUrl,

            // data
            creatorId: creator?.id,
            caption: String(post.caption),
            userId: sessionId,

            // insighst
            engagementCount:
              ((post.likes + post.shares + post.saved + post.comments) /
                creator?.followersCount!) *
              100,
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
            // urls
            platform: 'instagram',
            permalink: String(post.permalink),
            shortcode: String(post.shortcode),
            imageUrl: UploadedMediaUrl,

            // data
            creatorId: creator?.id,
            caption: String(post.caption),
            userId: sessionId,
            uuid: post.id,

            // insighst
            engagementCount:
              ((post.likes + post.shares + post.saved + post.comments) /
                creator?.followersCount!) *
              100,
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
            creator?.followersCount!) *
            100,
        )
        console.log('Likes:', post.likes)
        console.log('Impressions:', post.impressions)
        console.log('Saved:', post.saved)
        console.log('Shares:', post.shares)
        console.log('Plays:', post.plays)
        console.log('-----------------------------')
      }
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, ERROR: error })
  }

  return NextResponse.json('ok')
}
