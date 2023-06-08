import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // if (!session)
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const userEmail = session?.user?.email
    const currentUser = await prisma.user.findUnique({
      where: { email: userEmail! },
    })
    const campaigns = await prisma.campaign.findMany({
      where: {
        userId: currentUser?.id,
      },
      orderBy: {
        createdAt: 'desc',
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
        clientId,
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
