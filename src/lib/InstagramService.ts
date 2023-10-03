import {
  InstagramData,
  InstagramOembed,
  MediaDatum,
} from '@/types/InstagramTypes'
import { Post } from '@prisma/client'

export default class InstagramService {
  static async getShortcode(url: string) {
    return url.split('/')[4]
  }

  static async getPostInfo(shortcode: string): Promise<InstagramOembed | null> {
    const oemBedUrl = new URL(
      `https://graph.facebook.com/${process.env.FACEBOOK_GRAPH_VERSION}/instagram_oembed/`,
    )
    oemBedUrl.searchParams.append(
      'url',
      `https://www.instagram.com/p/${shortcode}/`,
    )
    oemBedUrl.searchParams.append(
      'access_token',
      process.env.BUSINESS_TOKEN_DEWIN!,
    )

    try {
      const oemBedResponse = await fetch(oemBedUrl.toString())
      const data = await oemBedResponse.json()

      if (oemBedResponse.status !== 200) {
        console.log('Instagram Oembed Error', data.error || data)
        return null
      }

      return data as InstagramOembed
    } catch (e) {
      console.log('IgOembed', e)
    }
    return null
  }

  static async getPublicInstagramData(username: string) {
    const publicResUrl = new URL(
      `https://graph.facebook.com/${process.env.FACEBOOK_GRAPH_VERSION}/${process.env.BUSINESS_ID_DEWIN}/`,
    )
    publicResUrl.searchParams.append(
      'fields',
      `business_discovery.username(${username}){followers_count,username,name,profile_picture_url,media_count,media.limit(500){caption,media_url,permalink,comments_count,like_count}}`,
    )
    publicResUrl.searchParams.append(
      'access_token',
      `${process.env.BUSINESS_TOKEN_DEWIN}`,
    )

    try {
      const res = await fetch(publicResUrl.toString())
      const data = await res.json()

      if (res.status !== 200) {
        console.log('Instagram Public Data error', data.error || data)
        return null
      }

      return data.business_discovery as InstagramData
    } catch (e) {
      console.log('PublicIgData', e)
    }
    return null
  }

  static async getPrivateInstagramData(id: string, access_token: string) {
    const privateResUrl = new URL(
      `https://graph.facebook.com/${process.env.FACEBOOK_GRAPH_VERSION}/${id}/`,
    )
    privateResUrl.searchParams.append(
      'fields',
      'username,profile_picture_url,followers_count,media{caption,media_url,cover_url,permalink,shortcode,thumbnail_url,insights.metric(engagement,impressions,reach,saved,shares,likes,comments, plays){name,values}}.limit(500)',
    )
    privateResUrl.searchParams.append('access_token', access_token)

    try {
      const res = await fetch(privateResUrl.toString())
      const data = await res.json()

      if (res.status !== 200) {
        console.log('Instagram Private data error', data.error || data)
        return null
      }

      return res as InstagramData
    } catch (e) {
      console.log('PrivateIgData', e)
    }
    return null
  }

  // static async getPostsByHashtag(username: string, hashtag: string):Promise<MediaDatum[] | null> {
  //   const

  // }

  static getInsights(post: MediaDatum) {
    let commentsCount = post.comments_count ?? 0
    let likesCount = post.like_count ?? 0
    let impressionsCount = 0
    let reachCount = 0
    let savesCount = 0
    let sharesCount = 0
    let playsCount = 0
    let engagementCount = 0

    post?.insights?.data?.map((insight: any) => {
      insight.values.map((value: any) => {
        if (insight.name === 'engagement') {
          engagementCount += value.value ?? 0
        }
        if (insight.name === 'comments') {
          commentsCount += value.value ?? 0
        }
        if (insight.name === 'likes') {
          likesCount += value.value ?? 0
        }
        if (insight.name === 'impressions') {
          impressionsCount += value.value
        }
        if (insight.name === 'reach') {
          reachCount += value.value ?? 0
        }
        if (insight.name === 'saved') {
          savesCount += value.value ?? 0
        }
        if (insight.name === 'shares') {
          sharesCount += value.value ?? 0
        }
        if (insight.name === 'plays') {
          playsCount += value.value ?? 0
        }
      })
    })

    return {
      commentsCount,
      likesCount,
      impressionsCount,
      reachCount,
      savesCount,
      sharesCount,
      playsCount,
      engagementCount,
    }
  }
}
