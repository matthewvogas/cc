import { authOptions } from '../../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import S3Service from '@/lib/S3Service'
import sharp from 'sharp'
import db from '@/lib/db'

export async function POST(req: NextRequest) {
  const { selectedPostIds, Id } = await req.json()

  try {

    console.log(Id)
      const addToCampaign = await db.campaign.update({
        where: {
          id: parseInt(Id),
        },
        data: {
          posts: {
            connect: selectedPostIds.map((id: any) => ({ id })),
          },
        },
      })

      console.log(addToCampaign)


    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
