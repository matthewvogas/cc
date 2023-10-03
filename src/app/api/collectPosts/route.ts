import { authOptions } from '../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import db from '@/lib/db'
import { SocialConnectionService } from '@/services/SocialConnectionService'
import { InstagramPagesService } from '@/services/InstagramPagesService'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  
  const { instagramPage } = await req.json()

  const page = await InstagramPagesService.findUnique(instagramPage) 

  console.log('Page: ',instagramPage, page)

  const token = await SocialConnectionService.findInstagramToken(session!.user.id)

  const posts = await fetch(
    `https://graph.facebook.com/v17.0/${instagramPage}/media?fields=id,media_type,caption,media_url,cover_url,permalink,shortcode,thumbnail_url,insights.metric(engagement,comments,likes,impressions,reach,saved,shares,plays)&access_token=${token}&limit=2`,
  ).then(res => res.json())

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

  const postDataArray = extractPostData(posts.data)

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



  for (const post of postDataArray) {

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
        users: {
          connect: {
            id: session!.user.id,
          },
        },
      },
      update: {
        followersCount: parseInt(page[0].followers_count),
        users: {
          connect: {
            id: session!.user.id,
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
        creatorId:creator.id,
        caption: post.caption,
        userId: session!.user.id,

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
        creatorId:creator.id,
        caption: String(post.caption),
        userId: session!.user.id,

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

    console.log(showPost, postToSave)
  }

  return NextResponse.json('ok')
}
