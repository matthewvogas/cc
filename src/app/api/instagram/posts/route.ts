import prisma from '@/lib/prisma'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

const isMp4 = (url: string) => {
  if (!url) return false
  return url.includes('.mp4')
}

const getUsername = async (url: string) => {
  const res = await axios.get(url)
  const html = await res.data
  const $ = await cheerio.load(html)

  const description = await $('meta[name="twitter:title"]').attr('content')

  console.log(await description)
  const userName = await description!.split('@')[1].split(')')[0]

  return userName
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session) return NextResponse.json({ message: 'No session' })

  try {
    const { newPosts, campaignId } = await req.json()
    // const newPosts =
    //   'https://www.instagram.com/reel/CpVjVvnPGrG/,https://www.instagram.com/reel/Co5ISP1Ldov/,https://www.instagram.com/p/ConOqjDj6WU/,https://www.instagram.com/reel/CpLfo7hIAcg/,https://www.instagram.com/reel/CpFad3kjFnh/,https://www.instagram.com/p/CpSEoHfD6-a/'
    const newPostsArray = newPosts.split(',')

    for (const url of newPostsArray) {
      try {
        const userName = await getUsername(url)
        console.log(userName)
        const instagramRes = await fetch(
          `https://graph.facebook.com/${process.env.BUSINESS_ID}?fields=business_discovery.username(${userName}){followers_count,media_count,media.limit(100){comments_count,like_count,caption,media_product_type,media_type,permalink,media_url,username},website,username,name,follows_count}&access_token=${process.env.BUSINESS_TOKEN}`,
        ).then(res => res.json())
        const followers = instagramRes.business_discovery?.followers_count
        const post = instagramRes.business_discovery.media.data.find(
          (post: any) => post.permalink === url,
        )
        post && console.log(post)
        post &&
          (await prisma.post.upsert({
            where: {
              igId: post!.id!,
            },
            create: {
              caption: post.caption || null,
              commentsCount: post.comments_count || null,
              campaignId: parseInt(campaignId),
              likesCount: post.like_count || null,
              mediaProductType: post.media_product_type || null,
              mediaType: post.media_type || null,
              permalink: post.permalink || null,
              shortcode: post.shortcode || null,
              imageUrl: (!isMp4(post.media_url) && post.media_url) || null,
              videoUrl: (isMp4(post.media_url) && post.media_url) || null,
              igId: post.id || null,
              username: post.username || null,
              followersCount: followers || null,
            },
            update: {
              caption: post.caption || null,
              commentsCount: post.comments_count || null,
              campaignId: parseInt(campaignId),
              likesCount: post.like_count || null,
              mediaProductType: post.media_product_type || null,
              mediaType: post.media_type || null,
              permalink: post.permalink || null,
              shortcode: post.shortcode || null,
              imageUrl: (!isMp4(post.media_url) && post.media_url) || null,
              videoUrl: (isMp4(post.media_url) && post.media_url) || null,
              igId: post.id || null,
              username: post.username || null,
              followersCount: followers || null,
            },
          }))
      } catch (e: any) {
        console.log(e.message)
      }
    }
    return NextResponse.json({ message: 'ok' })

    //Get beautybyrobina
  } catch (e: any) {
    return NextResponse.json(e.message)
  }
}
