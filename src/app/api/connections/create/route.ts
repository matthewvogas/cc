import { authOptions } from '../../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request, res: Response) {

  try {
    const { to, session } = await req.json()

    const exist = await db.accessConnection.findFirst({
      where: {
        email: to,
        userId: session
      },
    })

    if (exist) {
      const shareAccess = await db.accessConnection.upsert({
        where: {
          id: exist.id,
        },
        create: {
          email: to,
          userId: session
        },
        update: {
          email: to,
          userId: session
        },
      })
    } else {
        console.log('CREANDO')
      const shareAccess = await db.accessConnection.create({
        data: {
          email: to,
          userId: session
        },
      })
    }

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
