import { InstagramPagesService } from '@/services/InstagramPagesService'
import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { SocialConnectionService } from '@/services/SocialConnectionService'

export async function POST(req: NextRequest) {

  const { sessionId } = await req.json()
  
  const tiktokToken = await SocialConnectionService.findTikTokToken(sessionId)

  interface PostData {
    id: string
    media_type: string

    caption: string
    media_url: string
    permalink: string
    shortcode: string
    thumbnail_url: string

    // photo and video
    reach: number
    engagement: number
    comments: number
    likes: number
    impressions: number
    saved: number
    shares: number

    // video
    plays: number
    video_views: number
  }
  
  async function getUserInfo(accessToken: any): Promise<any> {
    const url =
      'https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name,username,bio_description,profile_deep_link,is_verified,follower_count,video_count,likes_count'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  }
  
  
  const userData = await getUserInfo(tiktokToken)

  console.log(userData)

  async function getUserVideos(accessToken: any): Promise<any> {
    const url =
      'https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,duration,cover_image_url,embed_link&max_count=20'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  }

  const page = userData.data.user;
  const response = await getUserVideos(tiktokToken);
  const videos = response.data.videos  

  const postDataArray = Array.isArray(response.data.videos)
    ? extractPostData(response.data.videos)
    : []

  console.log(postDataArray)

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
        engagement:
          insights.find((insight: any) => insight.name === 'engagement')
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

  for (const post of videos) {
    const creator = await db.creator.upsert({
      where: {
        username_platform: {
          username: page[0].username,
          platform: 'instagram',
        },
      },
      create: {
        followersCount: parseInt(page[0].followers_count),
        username: page[0].username,
        platform: 'instagram',
        uuid: page[0].id,
        users: {
          connect: {
            id: sessionId,
          },
        },
      },
      update: {
        followersCount: parseInt(page[0].followers_count),
        uuid: page[0].id,
        users: {
          connect: {
            id: sessionId,
          },
        },
      },
    })

    const postToSave = await db.post.upsert({
      where: {
        shortcode_platform: {
          shortcode: String(post.shortcode),
          platform: 'instagram',
        },
      },
      create: {
        platform: 'instagram',
        permalink: post.permalink,
        shortcode: post.shortcode,
        imageUrl: post.thumbnail_url || post.media_url,

        // data
        creatorId: creator.id,
        caption: post.caption,
        userId: sessionId,

        // insighst
        engagementCount: post.engagement,
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
        imageUrl: post.thumbnail_url || post.media_url,

        // data
        creatorId: creator.id,
        caption: String(post.caption),
        userId: sessionId,

        // insighst
        engagementCount: post.engagement,
        reachCount: post.reach,
        sharesCount: post.shares,
        commentsCount: post.comments,
        playsCount: post.plays,
        savesCount: post.saved,
        likesCount: post.likes,
      },
    })

    const showPost = () => {
      console.log('Caption:', post.caption)
      console.log('Media URL:', post.media_url)
      console.log('Permalink:', post.permalink)
      console.log('Shortcode:', post.shortcode)
      console.log('Comments:', post.comments)
      console.log('Engagement:', post.engagement)
      console.log('Likes:', post.likes)
      console.log('Impressions:', post.impressions)
      console.log('Saved:', post.saved)
      console.log('Shares:', post.shares)
      console.log('Plays:', post.plays)
      console.log('-----------------------------')
    }

    return NextResponse.json({'postToSave': showPost})
  }

  return NextResponse.json('ok')
}
