import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { ClientsService } from '@/services/ClientsServices'
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
    const hasMore = true

    const clients = await ClientsService.findMany(
      session!.user.id,
      limit,
      offset,
    )

    const total = await ClientsService.findMany(session!.user.id)
    const totalClients = total.length

    return NextResponse.json({ clients, totalClients, hasMore })

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

    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const name = formData.get('name') as string
    const tags = JSON.parse(formData.get('tags') as string)
    const image = formData.get('image') as Blob

    const UploadedImageUrl = null;

    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer())
      const resized = await sharp(buffer).webp({ quality: 80 }).toBuffer()
      const blob = new Blob([resized], { type: 'image/webp' })

      const UploadedImageUrl = await S3Service.uploadObject(
        blob,
        name,
        'clients',
        'images',
      )

      if (!UploadedImageUrl) {
        throw new Error('Failed to upload image to S3')
      }
    }

    const existingTags = await db.tag.findMany({
      where: {
        name: {
          in: tags,
        },
      },
    })

    const existingTagNames = existingTags.map(tag => tag.name)
    const newTags = tags.filter(
      (tag: string) => !existingTagNames.includes(tag),
    )
    await db.tag.createMany({
      data: newTags.map((tag: any) => ({ name: tag })),
    })

    const client = await db.client.create({
      data: {
        userId: session!.user.id,
        name,
        tags: {
          connect: tags.map((tag: any) => ({ name: tag })),
        },
        imageUrl: UploadedImageUrl,
      },
    })

    return NextResponse.json({ success: true })
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
    await db.client.deleteMany({
      where: {
        userId: session?.user.id,
      },
    })

    return NextResponse.json({ success: 'All clients deleted' })
  } catch (err: any) {
    console.error('Error deleting all clients:', err)
    return NextResponse.json(
      { error: 'An error occurred while deleting all clients' },
      {
        status: 500,
      },
    )
  }
}
