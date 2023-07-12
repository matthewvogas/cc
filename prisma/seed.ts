import { Post, PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const db = new PrismaClient()

async function main() {
  const instagramPublicRes = await fetch(
    `https://graph.facebook.com/${process.env.BUSINESS_SOPHIA}?fields=business_discovery.username(milkbar.co){followers_count,media_count,media.limit(10000){comments_count,like_count,caption,media_product_type,media_type,permalink,media_url,username},website,username,name,follows_count}&access_token=${process.env.BUSINESS_TOKEN_SOPHIA}`,
  )

  const instagramPrivateRes = await fetch(
    `https://graph.facebook.com/v16.0/${process.env.BUSINESS_SOPHIA}/media?fields=caption,comments_count,ig_id,id,is_comment_enabled,is_shared_to_feed,like_count,media_product_type,media_type,media_url,owner,permalink,shortcode,thumbnail_url,username,timestamp,insights.metric(engagement,impressions,reach,saved,comments,likes,shares)&access_token=${process.env.BUSINESS_TOKEN_SOPHIA}`,
  )

  // const isMp4 = (url: string) => {
  //   if (!url) return false
  //   return url.includes('.mp4')
  // }

  // const instagramData = await instagramPublicRes.json()

  // const followers = instagramData.business_discovery.followers_count

  // const privateData = await instagramPrivateRes.json()
  // const privatePosts = privateData.data
  // const dummyPost = privatePosts.map((post: Post) => {
  //   return {
  //     caption: post.caption || null,
  //     commentsCount: post.comments_count || null,
  //     campaignId: 1,
  //     likesCount: post.like_count || null,
  //     mediaProductType: post.media_product_type || null,
  //     mediaType: post.media_type || null,
  //     permalink: post.permalink || null,
  //     shortcode: post.shortcode || null,
  //     imageUrl: (!isMp4(post.media_url) && post.media_url) || null,
  //     videoUrl: (isMp4(post.media_url) && post.media_url) || null,
  //     igId: post.id || null,
  //     username: post.username || null,
  //     followersCount: followers || null,
  //     engagementCount:
  //       post.insights.data.find((insight: any) => insight.name === 'engagement')
  //         ?.values[0]?.value || null,
  //     impressionsCount:
  //       post.insights.data.find(
  //         (insight: any) => insight.name === 'impressions',
  //       )?.values[0]?.value || null,
  //     reachCount:
  //       post.insights.data.find((insight: any) => insight.name === 'reach')
  //         ?.values[0]?.value || null,
  //     savesCount:
  //       post.insights.data.find((insight: any) => insight.name === 'saved')
  //         ?.values[0]?.value || null,
  //     sharesCount:
  //       post.insights.data.find((insight: any) => insight.name === 'shares')
  //         ?.values[0]?.value || null,
  //   }
  // })

  // const password = await hash(`test`, 12)
  // const email = 'test@test.com'

  // await db.user.upsert({
  //   where: { email },
  //   update: {
  //     email,
  //     name: `Test User`,
  //     password,
  //   },
  //   create: {
  //     email,
  //     name: `Test User`,
  //     password,
  //   },
  // })

  // const currentUser = await db.user.findUnique({
  //   where: { email },
  // })

  // await db.client.upsert({
  //   where: { id: 1 },
  //   update: {
  //     name: `Test Client`,
  //     email: 'client@example.com',
  //     phone: '1234567890',
  //     userId: currentUser?.id!,
  //   },
  //   create: {
  //     name: `Test Client`,
  //     email: 'client@example.com',
  //     phone: '1234567890',
  //     userId: currentUser?.id!,
  //   },
  // })

  // await db.campaign.upsert({
  //   where: { id: 1 },
  //   update: {
  //     name: `Test Campaign`,
  //     description: `This is a test campaign`,
  //   },
  //   create: {
  //     name: `Test Campaign`,
  //     description: `This is a test campaign`,
  //     userId: currentUser?.id!,
  //     clientId: 1,
  //   },
  // })

  // await db.post.createMany({
  //   data: dummyPost,
  // })
  // console.log({ user })
}

main()
  .then(() => db.$disconnect())
  .catch(async e => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
