import db from '@/lib/db'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import S3Service from '@/lib/S3Service'
import InstagramService from '@/lib/InstagramService'
import { authOptions } from '../auth/[...nextauth]/route'
import TiktokService from '@/lib/TiktokService'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const { posts, campaignId } = (await req.json()) as {
    posts: string[]
    campaignId: string
  }


  let postSaved: Array<string> = []
  let postError: Array<string> = []
  let postSkipped: Array<string> = []
  // console.log(urls)

  for (const url of posts) {
    console.log('Processing url: ' + url.trim())
    if (!url) {
      console.log('ERROR No url')
      postError.push(url.trim())
      continue
    }

    if (url.includes('instagram')) {
      const shortcode = await InstagramService.getShortcode(url.trim())
      const oembed = await InstagramService.getPostInfo(shortcode)

      if (!oembed) {
        console.log('ERROR No Oembed')
        postError.push(url.trim())
        continue
      }

      // const creatorInDb = await db.creator.findFirst({
      //   where: {
      //     username: oembed?.author_name,
      //     platform: 'instagram',
      //   },
      // })

      // let data = null

      // if (creatorInDb && creatorInDb.accessToken) {
      //   data = await InstagramService.getPrivateInstagramData(
      //     shortcode,
      //     creatorInDb.accessToken,
      //   )
      // }

      // if (!data) {
      //   console.log('No Token')
      //   postError++
      //   continue
      // }

      // const profileUrl = await fetch(res.profile_picture_url!).then(res =>
      //   res.blob(),
      // )
      // const profileImageUrl = await S3Service.uploadCreatorImage(
      //   profileUrl,
      //   res.id!,
      // )

      // console.log(profileImageUrl)

      const creator = await db.creator.upsert({
        where: {
          username_platform: {
            username: oembed.author_name!,
            platform: 'instagram',
          },
        },
        create: {
          username: oembed.author_name!,
          platform: 'instagram',
          users: {
            connect: {
              id: session!.user.id,
            },
          },
          campaigns: {
            connect: {
              id: +campaignId,
            },
          },
        },
        update: {
          campaigns: {
            connect: {
              id: +campaignId,
            },
          },
          users: {
            connect: {
              id: session!.user.id,
            },
          },
        },
      })

      // if (!creator) {
      //   console.log('Creator not found')
      //   postError++
      //   continue
      // }

      // const postOnRes = res.media?.data?.find(
      //   media => media.permalink?.includes(shortcode),
      // )

      // if (!postOnRes) {
      //   console.log('Post not found')
      //   postError++
      //   continue
      // }

      let thumbnail_url = null

      try {
        const thumbnail = await fetch(oembed?.thumbnail_url!).then(res =>
          res.blob(),
        )

        thumbnail_url = await S3Service.uploadObject(
          thumbnail,
          shortcode,
          'instagram',
          'thumbnails',
        )
      } catch (e) {
        console.log('ERROR No thumbnail for link', url.trim())
      }

      // let media_url = thumbnail_url
      // if (postOnRes.media_url && postOnRes.media_url.includes('.mp4')) {
      //   const video = await fetch(postOnRes.media_url!).then(res => res.blob())
      //   media_url = await S3Service.uploadPostObject(video, postOnRes.id!)
      // }

      //const postInsights = InstagramService.getInsights(postOnRes)
      const postExists = await db.post.findFirst({
        where: {
          shortcode: shortcode,
        },
      })

      if (postExists) {
        postSkipped.push(url.trim())
        console.log('Post already exists')
        continue
      }

      const postToSave = await db.post.upsert({
        where: {
          shortcode_platform: {
            shortcode: shortcode,
            platform: 'instagram',
          },
        },
        create: {
          shortcode: shortcode,
          platform: 'instagram',
          campaignId: +campaignId,
          userId: session!.user.id,
          creatorId: creator.id,
          imageUrl: thumbnail_url,
          permalink: `https://www.instagram.com/p/${shortcode}/`,
        },
        update: {
          imageUrl: thumbnail_url,
          campaignId: +campaignId,
          userId: session!.user.id,
          creatorId: creator.id,
          permalink: `https://www.instagram.com/p/${shortcode}/`,
        },
      })

      // if (!postToSave) {
      //   console.log('Post not saved')
      //   postError++
      //   continue
      // }
      if (postToSave) {
        console.log(`Post ${url.trim()} saved to db`)
        postSaved.push(postToSave.permalink!)
      }
    }
    if (url.includes('tiktok')) {
      if (url.startsWith('https://vm.tiktok.com')) {
        postError.push(url.trim())
        console.log('ERROR No Oembed for link ' + url.trim())
        continue
      }
      const oembed = await TiktokService.getPostInfo(url.trim())
      if (!oembed || !oembed?.thumbnail_url) {
        postError.push(url.trim())
        console.log('ERROR No Oembed for link ' + url.trim())
        continue
      }

      const creator = await db.creator.upsert({
        where: {
          username_platform: {
            platform: 'tiktok',
            username: oembed?.author_unique_id!,
          },
        },
        create: {
          name: oembed?.author_name,
          username: oembed?.author_unique_id!,
          platform: 'tiktok',
          campaigns: {
            connect: {
              id: +campaignId,
            },
          },
          users: {
            connect: {
              id: session!.user.id,
            },
          },
        },
        update: {
          name: oembed?.author_name!,
          campaigns: {
            connect: {
              id: +campaignId,
            },
          },
          users: {
            connect: {
              id: session!.user.id,
            },
          },
        },
      })

      let thumbnail_url = null

      try {
        const thumbnail = await fetch(oembed?.thumbnail_url!).then(res =>
          res.blob(),
        )

        thumbnail_url = await S3Service.uploadObject(
          thumbnail,
          oembed.embed_product_id!,
          'tiktok',
          'thumbnails',
        )
      } catch (err) {
        postError.push(url.trim())
        console.log('ERROR No thumbnail for link ' + url.trim())
        continue
      }

      try {
        const postExists = await db.post.findFirst({
          where: {
            shortcode: oembed.embed_product_id!,
          },
        })

        if (postExists) {
          postSkipped.push(url.trim())
          console.log('Post already exists')
          continue
        }

        const postToSave = await db.post.upsert({
          where: {
            shortcode_platform: {
              shortcode: oembed.embed_product_id!,
              platform: 'tiktok',
            },
          },
          create: {
            platform: 'tiktok',
            uuid: oembed.embed_product_id!,
            campaignId: +campaignId,
            userId: session!.user.id,
            permalink: `https://www.tiktok.com/@${oembed?.author_unique_id}/video/${oembed.embed_product_id!}`,
            creatorId: creator.id,
            imageUrl: thumbnail_url,
            mediaUrl: thumbnail_url,
            commentsCount: 0,
            likesCount: 0,
            sharesCount: 0,
            playsCount: 0,
            caption: oembed?.title!,
            engagementCount: 0,
            impressionsCount: 0,
            reachCount: 0,
            shortcode: oembed.embed_product_id!,
            savesCount: 0,
          },
          update: {
            uuid: oembed.embed_product_id!,
            campaignId: +campaignId,
            userId: session!.user.id,
            permalink: `https://www.tiktok.com/@${oembed?.author_unique_id}/video/${oembed.embed_product_id}`,
            creatorId: creator.id,
            imageUrl: thumbnail_url,
            mediaUrl: thumbnail_url,
            commentsCount: 0,
            likesCount: 0,
            sharesCount: 0,
            playsCount: 0,
            caption: oembed?.title!,
            engagementCount: 0,
            impressionsCount: 0,
            reachCount: 0,
            shortcode: oembed.embed_product_id!,
            savesCount: 0,
          },
        })

        if (!postToSave) {
          console.log('Post not saved')
          postError.push(url.trim())
          continue
        }
        console.log(`Post ${postToSave.permalink} saved to db`)
        postSaved.push(postToSave.permalink!)
      } catch (err) {
        console.log(err)
        postError.push(url.trim())
        continue
      }
    }
    else{
      postError.push(url.trim())
      console.log('ERROR No Oembed for link ' + url.trim())
      continue
    }
  }

  console.log('Posts saved: ' + postSaved.length)
  console.log('Posts skipped: ' + postSkipped.length)
  console.log('Posts errors: ' + postError.length)
  console.log('Posts total: ' + posts.length)

  //Print the array of posts errors
  console.log('Posts errors: ' + postError)

  return NextResponse.json('ok')
}
