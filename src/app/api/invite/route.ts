import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    const { senderId, receiverId } = await req.json()

    const invite = await db.invite.create({
      data: {
        senderId: senderId,
        receiverId: receiverId,
        status: 'PENDING',
      },
    })

    return NextResponse.json({ success: true, invite })
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
