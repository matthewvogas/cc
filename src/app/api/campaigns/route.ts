import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import db from '@/lib/db'
import S3Service from '@/lib/S3Service'
import sharp from 'sharp'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const session = await getServerSession(authOptions)

    if (!session)
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const limit = parseInt(url.searchParams.get('limit') || '10')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    if (isNaN(limit) || isNaN(offset)) {
      return NextResponse.json(
        { error: 'Invalid query parameters' },
        { status: 400 },
      )
    }

    const hasMore = true

    const campaigns = await CampaignsService.findMany(
      session!.user.id,
      limit,
      offset,
    )
    const total = await CampaignsService.findMany(session!.user.id)
    const totalCampaigns = await total.length

    return NextResponse.json({ totalCampaigns, campaigns, hasMore })
  } catch (err) {
    console.log(err)
    return NextResponse.json(err, {
      status: 500,
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    console.log(session)
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const clientId = formData.get('clientId') as string
    const title = formData.get('title') as string
    const hashtag = formData.get('hashtag') as string
    const image = formData.get('image') as Blob
    const UploadedImageUrl = null;

    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer())
      const resized = await sharp(buffer).webp({ quality: 80 }).toBuffer()
      const blob = new Blob([resized], { type: 'image/webp' })

      const UploadedImageUrl = await S3Service.uploadObject(
        blob,
        name,
        'campaigns',
        'images',
      )

      if (!UploadedImageUrl) {
        throw new Error('Failed to upload image to S3')
      }
    }

    const campaign = await db.campaign.create({
      data: {
        name,
        description,
        clientId: +clientId || null,
        userId: session!.user.id,
        imageUrl: UploadedImageUrl,
      },
    })

    return NextResponse.json({ success: true, campaign })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      },
    )
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)

  try {
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await db.campaign.deleteMany({
      where: {
        userId: session.user.id,
      },
    })

    return NextResponse.json({ success: 'All campaigns deleted' })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      },
    )
  }
}
