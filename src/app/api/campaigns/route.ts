import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // if (!session)
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const tenant_id = session?.user.id.toString() || '1'
    const campaigns = await prisma.campaign.findMany({
      where: {
        tenant_id: parseInt(tenant_id),
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
    const session = await getServerSession(authOptions)
    // if (!session)
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    const tenant_id = session?.user.id.toString() || '1'
    const { name, description, client_id } = await req.json()

    await prisma.campaign.create({
      data: {
        name,
        description,
        client_id,
        tenant_id: parseInt(tenant_id),
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
