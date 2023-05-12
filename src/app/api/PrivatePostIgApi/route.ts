import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import axios from 'axios'
import prisma from '@/lib/prisma'

export async function GET() {
  const url = 'https://www.instagram.com/p/CorTjl1IzCc/'

  const res = await axios.get(url)

  const html = res.data

  const $ = cheerio.load(html)

  //Get beautybyrobina

  const getMetatag = (name: string) => {
    return (
      $(`meta[name=${name}"]`).attr('content') ||
      $(`meta[property="og:${name}"]`).attr('content') ||
      $(`meta[property="twitter:${name}"]`).attr('content') ||
      $(`meta[property="twitter:title"]`).attr('content') ||
      'No hay metatag'
    )
  }

  const description = getMetatag('description')
  const match = description.match(/\(@\w+\)/)
  const userName = match ? match[0].slice(2, -1) : 'No hay usuario'

  const instagramRes = await fetch(
    `https://graph.facebook.com/${process.env.BUSINESS_SOPHIA}?fields=business_discovery.username(milkbar.co){followers_count,media_count,media.limit(10000){comments_count,like_count,caption,media_product_type,media_type,permalink,media_url,username},website,username,name,follows_count}&access_token=${process.env.BUSINESS_TOKEN_SOPHIA}`,
  )

  const privateRes = await fetch(
    `https://graph.facebook.com/v16.0/${process.env.BUSINESS_SOPHIA}/media?fields=caption,comments_count,ig_id,id,is_comment_enabled,is_shared_to_feed,like_count,media_product_type,media_type,media_url,owner,permalink,shortcode,thumbnail_url,username,timestamp,insights.metric(engagement,impressions,reach,saved,comments,likes,shares)&access_token=${process.env.BUSINESS_TOKEN_SOPHIA}`,
  )

  const instagramData = await instagramRes.json()

  const followers = instagramData.business_discovery.followers_count

  const privateData = await privateRes.json()
  console.log(privateData)

  const posts = privateData.data

  const isMp4 = (url: string) => {
    if (!url) return false
    return url.includes('.mp4')
  }

  Promise.all(
    posts.map(async (post: any) => {
      const exists = await prisma.post.findUnique({
        where: {
          ig_id: post.id,
        },
      })

      if (!exists) {
        await prisma.post.create({
          data: {
            caption: post.caption || '',
            comments_count: post.comments_count || 0,
            like_count: post.like_count || 0,
            media_product_type: post.media_product_type || '',
            media_type: post.media_type || '',
            permalink: post.permalink || '',
            shortcode: post.shortcode || '',
            image_url: isMp4(post.media_url) ? '' : post.media_url || '',
            video_url: isMp4(post.media_url) ? post.media_url : '',
            ig_id: post.id || '',
            username: post.username || '',
            followers_count: followers || 0,
            engagement:
              post.insights.data.find(
                (insight: any) => insight.name === 'engagement',
              )?.values[0]?.value || 0,
            impressions:
              post.insights.data.find(
                (insight: any) => insight.name === 'impressions',
              )?.values[0]?.value || 0,
            reach:
              post.insights.data.find(
                (insight: any) => insight.name === 'reach',
              )?.values[0]?.value || 0,
            saved:
              post.insights.data.find(
                (insight: any) => insight.name === 'saved',
              )?.values[0]?.value || 0,
            shares:
              post.insights.data.find(
                (insight: any) => insight.name === 'shares',
              )?.values[0]?.value || 0,
          },
        })
      }
    }),
  )

  return NextResponse.json(posts)
}
