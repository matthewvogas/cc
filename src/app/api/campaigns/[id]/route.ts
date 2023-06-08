import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(
  Request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email
  const currentUser = await prisma.user.findUnique({
    where: { email: userEmail! },
  })
  //Get id from url
  try {
    const campaign = await prisma.campaign.findUniqueOrThrow({
      where: {
        id: parseInt(params.id),
      },
      include: {
        posts: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    return NextResponse.json(campaign)
  } catch (err: any) {
    return NextResponse.json(err.message, {
      status: 404,
    })
  }
}
