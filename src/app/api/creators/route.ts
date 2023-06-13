import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // if (!session)
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const campaigns = await db.creator.findMany({
      where: {
        userId: session!.user.id,
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
    const currentUser = await db.user.findUnique({
      where: {
        email: session?.user!.email!,
      },
    })
    const { name, email } = await req.json()

    await db.client.create({
      data: {
        name,
        email,
        userId: currentUser?.id!,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    // console.log(err)
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      },
    )
  }
}
