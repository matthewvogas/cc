import { Post, PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const db = new PrismaClient()

async function main() {
  // const url = new URL(
  //   `https://graph.facebook.com/${process.env.FACEBOOK_GRAPH_VERSION}`,
  // )
  // url.pathname = `${process.env.BUSINESS_ID_DEWIN}`
  // url.searchParams.append(
  //   'fields',
  //   'username,profile_picture_url,followers_count,media{caption,media_url,cover_url,permalink,shortcode,thumbnail_url,insights.metric(engagement,impressions,reach,saved,shares,likes,comments, plays)}',
  // )
  // url.searchParams.append('access_token', process.env.BUSINESS_TOKEN_DEWIN!)

  // const res = (await fetch(url).then(res => res.json())) as InstagramResponse

  // console.log(res)

  // console.log(url.toString())

  const password = await hash(`test`, 12)
  const email = 'test@test.com'

  await db.user.upsert({
    where: { email },
    update: {
      email,
      name: `Test User`,
      password,
    },
    create: {
      email,
      name: `Test User`,
      password,
    },
  })

  const user = await db.user.findUnique({
    where: { email },
  })

  const client = await db.client.upsert({
    where: { id: 1 },
    update: {
      name: `Test Client`,
      email: 'client@example.com',
      phone: '1234567890',
      userId: user!.id!,
    },
    create: {
      name: `Test Client`,
      email: 'client@example.com',
      phone: '1234567890',
      userId: user!.id!,
    },
  })

  const campaign = await db.campaign.upsert({
    where: { id: 1 },
    update: {
      name: `Test Campaign`,
      description: `This is a test campaign`,
    },
    create: {
      name: `Test Campaign`,
      description: `This is a test campaign`,
      userId: user?.id!,
      clientId: 1,
    },
  })

  //   const creator = await db.creator.upsert({
  //     where: {
  //       uuid: res.id!,
  //     },
  //     update: {
  //       name: 'Dewin Umana',
  //       username: res.username,
  //       platform: 'facebook',
  //       imageUrl: res.profile_picture_url,
  //       uuid: res.id!,
  //       followersCount: res.followers_count,
  //       clients: {
  //         connect: {
  //           id: client.id,
  //         },
  //       },
  //       campaigns: {
  //         connect: {
  //           id: campaign.id,
  //         },
  //       },
  //       users: {
  //         connect: {
  //           id: user!.id!,
  //         },
  //       },
  //       accessToken: process.env.BUSINESS_TOKEN_DEWIN!,
  //     },
  //     create: {
  //       name: 'Dewin Umana',
  //       username: res.username,
  //       imageUrl: res.profile_picture_url,
  //       platform: 'facebook',
  //       uuid: res.id!,
  //       followersCount: res.followers_count,
  //       clients: {
  //         connect: {
  //           id: client.id,
  //         },
  //       },
  //       campaigns: {
  //         connect: {
  //           id: campaign.id,
  //         },
  //       },
  //       users: {
  //         connect: {
  //           id: user!.id!,
  //         },
  //       },
  //       accessToken: process.env.BUSINESS_TOKEN_DEWIN!,
  //     },
  //   })

  //   if (!res.media) {
  //     return
  //   }

  //   const dummyPost = await Promise.all(
  //     res.media!.data!.map(async (post: MediaDatum) => {
  //       const file = (await fetch(post.media_url!).then(res =>
  //         res.blob(),
  //       )) as File
  //       const buffer = await file.arrayBuffer()
  //       const putParams: PutObjectCommandInput = {
  //         Bucket: process.env.S3_BUCKET_NAME!,
  //         Key: file.name,
  //         ContentType: file.type,
  //         Body: new Uint8Array(buffer),
  //       }

  //       // console.log(file.type)

  //       const result = await s3Client.send(new PutObjectCommand(putParams))
  //       // console.log(result)
  //       const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.name}`
  //       // console.log(url)

  //       let commentsCount = 0
  //       let likesCount = 0
  //       let impressionsCount = 0
  //       let reachCount = 0
  //       let savesCount = 0
  //       let sharesCount = 0
  //       let playsCount = 0
  //       let engagementCount = 0

  //       post?.insights?.data?.map((insight: any) => {
  //         insight.values.map((value: any) => {
  //           if (insight.name === 'engagement') {
  //             engagementCount += value.value
  //           }

  //           if (insight.name === 'comments') {
  //             commentsCount += value.value
  //           }
  //           if (insight.name === 'likes') {
  //             likesCount += value.value
  //           }
  //           if (insight.name === 'impressions') {
  //             impressionsCount += value.value
  //           }
  //           if (insight.name === 'reach') {
  //             reachCount += value.value
  //           }
  //           if (insight.name === 'saved') {
  //             savesCount += value.value
  //           }
  //           if (insight.name === 'shares') {
  //             sharesCount += value.value
  //           }
  //           if (insight.name === 'plays') {
  //             playsCount += value.value
  //           }
  //         })
  //       })

  //       return {
  //         userId: user!.id!,
  //         uuid: post.id,
  //         campaignId: campaign.id,
  //         caption: post.caption,
  //         commentsCount,
  //         likesCount,
  //         impressionsCount,
  //         reachCount,
  //         savesCount,
  //         sharesCount,
  //         playsCount,
  //         shortcode: post.shortcode,
  //         mediaUrl: post.media_url,
  //         imageUrl: post.thumbnail_url ? post.thumbnail_url : post.media_url,
  //         permalink: post.permalink,
  //         engagementCount,
  //         creatorId: creator.id,
  //       } as Post
  //     }),
  //   )

  //   await db.post.createMany({
  //     data: dummyPost,
  //     skipDuplicates: true,
  //   })
}

main()
  .then(() => db.$disconnect())
  .catch(async e => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
