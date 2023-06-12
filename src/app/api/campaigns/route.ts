import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { CamapignsService } from '@/services/CampaignsService'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    })
    
    const campaignsService = new CamapignsService(currentUser!.id)
    const campaigns = await campaignsService.findMany()
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
    const userEmail = session?.user?.email
    const currentUser = await prisma.user.findUnique({
      where: { email: userEmail! },
    })
    const { name, description, clientId } = await req.json()

    console.log({ name, description, clientId })

    await prisma.campaign.create({
      data: {
        name,
        description,
        clientId: parseInt(clientId) || null,
        userId: currentUser?.id!,
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
    const session = await getServerSession(authOptions)
    const userEmail = session?.user?.email
    const currentUser = await prisma.user.findUnique({
      where: { email: userEmail! },
    })
    const { id, name, description } = await req.json()

    await prisma.campaign.update({
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
