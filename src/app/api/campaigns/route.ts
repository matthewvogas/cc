import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import db from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const campaigns = await CampaignsService.findMany(session!.user.id)
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

    const { name, description, clientId } = await req.json()

    console.log({ name, description, clientId })

    await db.campaign.create({
      data: {
        name,
        description,
        clientId: parseInt(clientId) || null,
        userId: session!.user.id,
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

export async function PUT(req: Request) {
  try {
    const { id, name, description } = await req.json()
    await db.campaign.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
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
