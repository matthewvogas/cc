import S3Service from '@/lib/S3Service'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import sharp from 'sharp'

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('campaign')

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  if (!id) {
    return NextResponse.json(
      { error: 'a campaign is required' },
      { status: 400 },
    )
  }

  try {
    const formData = await req.formData()
    const images = formData.getAll('images') as Blob[]
    console.log(images)

    // await Promise.all(
    //   images.map(async (image, index) => {
    //     const name = image.name.split('.')[0]
    //     const buffer = Buffer.from(await image.arrayBuffer())
    //     const resized = await sharp(buffer).webp({ quality: 50 }).toBuffer()
    //     const blob = new Blob([resized], { type: 'image/webp' })

    //     const url = await S3Service.uploadObject(
    //       blob,
    //       name,
    //       'instagram',
    //       'stories',
    //     )

    //     console.log(url)
    //     console.log(`Image ${index + 1} of ${images.length} uploaded`)

    //     await db.story.upsert({
    //       where: { imageUrl_campaignId: { imageUrl: url!, campaignId: +id } },
    //       create: { imageUrl: url!, campaignId: +id, userId: session!.user.id },
    //       update: { imageUrl: url!, campaignId: +id },
    //     })
    //   }),
    // )

    let count = 0
    for(const image of images) {
      const name = image.name.split('.')[0]
      const buffer = Buffer.from(await image.arrayBuffer())
        const resized = await sharp(buffer).webp({ quality: 50 }).toBuffer()
        const blob = new Blob([resized], { type: 'image/webp' })

        const url = await S3Service.uploadObject(
          blob,
          name,
          'instagram',
          'stories',
        )

        console.log(url)
        console.log(`Image ${count+1} of ${images.length} uploaded`)
        count++

        await db.story.upsert({
          where: { imageUrl_campaignId: { imageUrl: url!, campaignId: +id } },
          create: { imageUrl: url!, campaignId: +id, userId: session!.user.id },
          update: { imageUrl: url!, campaignId: +id },
        })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
