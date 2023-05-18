import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: {
        posts: {
          orderBy: {
            created_at: 'desc',
          },
        },
      },
    })

    return NextResponse.json(campaigns)
  } catch (err) {
    console.log(err)
    return NextResponse.json(err, {
      status: 500,
    })
  }
}

export async function POST(req: Request) {
  try {
    const { name, description, id } = await req.json()
    const campaign = await prisma.campaign.upsert({
      where: { id },
      update: {
        name,
        description,
      },
      create: {
        name,
        description,
      },
    })

    return NextResponse.json({ success: true})
  } catch (err: any) {
    // console.log(err)
    return NextResponse.json({error: err.message}, {
      status: 500,
    })
  }
}
