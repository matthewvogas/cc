import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const id = session?.user?.id
    const campaigns = await prisma.campaign.findMany({
      where: {
        tenant_id: parseInt(id),
      },
      orderBy: {
        created_at: 'desc',
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
    const { name, description } = await req.json()
    const campaign = await prisma.campaign.create({
      data: {
        name,
        description,
        client_id: 1,
        tenant_id: 1,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    // console.log(err)
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      },
    )
  }
}
