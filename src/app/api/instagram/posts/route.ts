import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

const isMp4 = (url: string) => {
  if (!url) return false
  return url.includes('.mp4')
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session) return NextResponse.json({ message: 'No session' })
  let browser
  try {
    const { newPosts, campaignId } = await req.json()
    browser = await puppeteer.connect({
      browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT,
    })
    const newPostsArray = newPosts.split(',')
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(2 * 60 * 1000)
    for (const url of newPostsArray) {
      await page.goto(url)
      await page.waitForSelector('meta[name="twitter:title"]')
      const description = await page.$eval('meta[name="twitter:title"]', el =>
        el.getAttribute('content'),
      )
      console.log(await description)
      const userName = await description!.split('@')[1].split(')')[0]
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
    }

    return NextResponse.json({ message: 'ok' })

    //Get beautybyrobina
  } catch (e: any) {
    console.log(e.message)
    return NextResponse.json(e.message)
  } finally {
    if (browser) {
      await browser.disconnect()
    }
  }
}
