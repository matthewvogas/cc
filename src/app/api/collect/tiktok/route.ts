import { InstagramPagesService } from '@/services/InstagramPagesService'
import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { SocialConnectionService } from '@/services/SocialConnectionService'

export async function POST(req: NextRequest) {
  const { userId } = await req.json()

  const token = await SocialConnectionService.findTikTokToken(userId)

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

  const response = await getUserInfo(token)
  const page = response.data.user

  const creator = await db.creator.upsert({
    where: {
      username_platform: {
        username: page.username,
        platform: 'tiktok',
      },
    },
    create: {
      followersCount: page.follower_count,
      username: page.username,
      platform: 'tiktok',
      uuid: page.open_id,
      users: {
        connect: {
          id: userId,
        },
      },
    },
    update: {
      followersCount: page.follower_count,
      uuid: page.open_id,
      users: {
        connect: {
          id: userId,
        },
      },
    },
  })

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

  async function getUserVideos(accessToken: any): Promise<any> {
    const url =
      'https://open.tiktokapis.com/v2/video/list/?fields=id,create_time,cover_image_url,share_url,video_description,duration,title,like_count,comment_count,share_count,view_count'
    const response = await fetch(url, {
      method: 'POST',
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

  const responseVideos = await getUserVideos(token)
  const videos = responseVideos.data.videos

  for (const post of videos) {


    const postExists = await db.post.findFirst({
      where: {
        shortcode: String(post.share_url),
        platform: 'tiktok',
      },
    })

    if (postExists) {
      const postToSave = await db.post.upsert({
        where: {
          id: postExists.id,
          shortcode: String(post.share_url),
          platform: 'tiktok',
        },
        create: {
          platform: 'tiktok',
          permalink: post.share_url,
          shortcode: post.share_url,
          imageUrl: post.cover_image_url,
  
          // data
          creatorId: creator.id,
          caption: post.video_description,
          userId: userId,
  
          // insighst
          engagementCount: (post.like_count + post.comment_count + post.share_count) / post.view_count * 100,
          reachCount: 0,
          sharesCount: post.share_count,
          commentsCount: post.comment_count,
          playsCount: post.view_count,
          savesCount: 0,
          likesCount: post.like_count,
        },
        update: {
          // urls
          platform: 'tiktok',
          permalink: String(post.share_url),
          shortcode: String(post.share_url),
          imageUrl: post.cover_image_url,
  
          // data
          creatorId: creator.id,
          caption: String(post.video_description),
          userId: userId,
  
          // insighst
          engagementCount: (post.like_count + post.comment_count + post.share_count) / post.view_count * 100,
          reachCount: 0,
          sharesCount: post.share_count,
          commentsCount: post.comment_count,
          playsCount: post.view_count,
          savesCount: 0,
          likesCount: post.like_count,
        },
      })
    } else {
      const postToSave = await db.post.create({
        data: {
          platform: 'tiktok',
          permalink: post.share_url,
          shortcode: post.share_url,
          imageUrl: post.cover_image_url,
  
          // data
          creatorId: creator.id,
          caption: post.video_description,
          userId: userId,
  
          // insighst
          engagementCount: (post.like_count + post.comment_count + post.share_count) / post.view_count * 100,
          reachCount: 0,
          sharesCount: post.share_count,
          commentsCount: post.comment_count,
          playsCount: post.view_count,
          savesCount: 0,
          likesCount: post.like_count,
        },
      })

    }

    const showPost = () => {
      console.log('Caption:', post.caption)
      console.log('Media URL:', post.media_url)
      console.log('Permalink:', post.share_url)
      console.log('Shortcode:', post.share_url)
      console.log('Comments:', post.comments)
      console.log('Engagement:', (post.like_count + post.comment_count + post.share_count) / post.view_count * 100)
      console.log('Likes:', post.like_count)
      console.log('Impressions:', post.impressions)
      console.log('Saved:', 0)
      console.log('Shares:', post.shares)
      console.log('Plays:', post.plays)
      console.log('-----------------------------')
    }

  }

  return NextResponse.json('ok')
}
