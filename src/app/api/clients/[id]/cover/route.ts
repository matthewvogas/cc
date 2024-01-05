import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import S3Service from '@/lib/S3Service'
import db from '@/lib/db'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const clientId = parseInt(params.id)

    const client = await db.client.findUnique({
      where: {
        id: clientId,
      },
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' })
    }
    return NextResponse.json(client.coverImage)
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 404,
    })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const clientId = parseInt(params.id)

    const formData = await req.formData()
    const name = formData.get('name') as string
    const image = formData.get('image') as Blob
    let UploadedImageUrl = null;

    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer())
      const resized = await sharp(buffer).webp({ quality: 95 }).toBuffer()
      const blob = new Blob([resized], { type: 'image/webp' })
  
      UploadedImageUrl = await S3Service.uploadObject(
        blob,
        name,
        'clients',
        'coverImages',
      )

      if (!UploadedImageUrl) {
        throw new Error('Failed to upload image to S3')
      }
    }

    const client = await db.client.update({
      where: {
        id: clientId,
      },
      data: {
        coverImage: UploadedImageUrl,
      },
    })
    return NextResponse.json(client)
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 404,
    })
  }
}
