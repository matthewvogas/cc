import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { ClientsService } from '@/services/ClientsServices'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // if (!session)
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 })


    const clientsService = new ClientsService(session!.user.id)
    const clients = await clientsService.findMany()
    return NextResponse.json(clients)
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
    const { name, email } = await req.json()

    await db.client.create({
      data: {
        name,
        userId: session!.user.id,
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
