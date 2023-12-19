import { authOptions } from '../../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import S3Service from '@/lib/S3Service'
import sharp from 'sharp'
import db from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const domain = process.env.NEXTAUTH_URL

  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const { status, id } = await req.json()

    console.log(status, id)

    const change = await db.campaign.update({
      where: {
        id: id,
      },
      data: {
        isPublic: status,
      },
    })

    console.log(change)

    return NextResponse.json({ success: change }, { status: 200 })

  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
