import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import S3Service from '@/lib/S3Service'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    const user = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
      select: {
        imageUrl: true,
      },
    })
    return NextResponse.json(user)
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
    const image = formData.get('image') as Blob

    const buffer = Buffer.from(await image.arrayBuffer())
    const resized = await sharp(buffer)
      .webp({ quality: 10 })
      .toBuffer()
    const blob = new Blob([resized], { type: 'image/webp' })

    const UploadedImageUrl = await S3Service.uploadObject(
      blob,
      name,
      'creators',
      'profileImages',
    )

    const user = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        imageUrl: UploadedImageUrl,
      },
    })

    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json(err, {
      status: 500,
    })
  }
}
