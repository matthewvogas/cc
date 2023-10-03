import db from '@/lib/db'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { inviteId, status } = await req.json()

    console.log(inviteId) 

    const invite = await db.invite.update({
      where: {
        id: inviteId,
      },
      data: {
        status: status,
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
