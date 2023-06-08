import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // if (!session)
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user!.email!,
      },
    })

    const campaigns = await prisma.post.findMany({
      where: {
        campaign: {
          userId: currentUser?.id,
        },
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
