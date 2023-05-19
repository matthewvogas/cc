import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const instagramPublicRes = await fetch(
    `https://graph.facebook.com/${process.env.BUSINESS_SOPHIA}?fields=business_discovery.username(milkbar.co){followers_count,media_count,media.limit(10000){comments_count,like_count,caption,media_product_type,media_type,permalink,media_url,username},website,username,name,follows_count}&access_token=${process.env.BUSINESS_TOKEN_SOPHIA}`,
  )

  const instagramPrivateRes = await fetch(
    `https://graph.facebook.com/v16.0/${process.env.BUSINESS_SOPHIA}/media?fields=caption,comments_count,ig_id,id,is_comment_enabled,is_shared_to_feed,like_count,media_product_type,media_type,media_url,owner,permalink,shortcode,thumbnail_url,username,timestamp,insights.metric(engagement,impressions,reach,saved,comments,likes,shares)&access_token=${process.env.BUSINESS_TOKEN_SOPHIA}`,
  )

  const isMp4 = (url: string) => {
    if (!url) return false
    return url.includes('.mp4')
  }

  const instagramData = await instagramPublicRes.json()

  const followers = instagramData.business_discovery.followers_count

  const privateData = await instagramPrivateRes.json()
  const privatePosts = privateData.data
  const dummyPost = privatePosts.map((post: any) => {
    return {
      caption: post.caption || null,
      comments_count: post.comments_count || null,
      campaign_id: 1,
      likes_count: post.like_count || null,
      media_product_type: post.media_product_type || null,
      media_type: post.media_type || null,
      permalink: post.permalink || null,
      shortcode: post.shortcode || null,
      image_url: !isMp4(post.media_url) && post.media_url || null,
      video_url: isMp4(post.media_url) && post.media_url || null,
      ig_id: post.id || null,
      username: post.username || null,
      followers_count: followers || null,
      engagement_count:
        post.insights.data.find((insight: any) => insight.name === 'engagement')
          ?.values[0]?.value || null,
      impressions_count:
        post.insights.data.find(
          (insight: any) => insight.name === 'impressions',
        )?.values[0]?.value || null,
      reach_count:
        post.insights.data.find((insight: any) => insight.name === 'reach')
          ?.values[0]?.value || null,
      saves_count:
        post.insights.data.find((insight: any) => insight.name === 'saved')
          ?.values[0]?.value || null,
      shares_count:
        post.insights.data.find((insight: any) => insight.name === 'shares')
          ?.values[0]?.value || null,
    }
  })

  const password = await hash(`test`, 12)

  await prisma.tenant.upsert({
    where: { email: `test@test.com` },
    update: {
      email: `test@test.com`,
      name: `Test User`,
      password,
    },
    create: {
      email: `test@test.com`,
      name: `Test User`,
      password,
      website: `https://www.test.com`,
      company_name: `Test Company`,
    },
  })

  await prisma.client.upsert({
    where: { id: 1 },
    update: {
      name: `Test Client`,
      email: 'client@example.com',
      phone: '1234567890',
      tenant_id: 1,
    },
    create: {
      name: `Test Client`,
      email: 'client@example.com',
      phone: '1234567890',
      tenant_id: 1,
    }
  })

  await prisma.campaign.upsert({
    where: { id: 1 },
    update: {
      name: `Test Campaign`,
      description: `This is a test campaign`,
    },
    create: {
      name: `Test Campaign`,
      description: `This is a test campaign`,
      tenant_id: 1,
      client_id: 1,
    },
  })

  await prisma.post.createMany({
    data: dummyPost,
  })
  // console.log({ user })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
