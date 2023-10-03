import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request, res: Response) {
  console.log('ENTRANDOOOOOOOOOOOO')

  try {
    const { userId1, userId2 } = await req.json()

    const invite = await db.connection.create({
      data: {
        userId1: userId1,
        userId2: userId2,
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
