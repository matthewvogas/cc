import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import db from '@/lib/db'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    const { role } = await req.json()

    const user = await db.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        role: role,
      },
    })

    return NextResponse.json({ success: true, user })
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
