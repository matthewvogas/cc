import { SocialConnectionService } from '@/services/SocialConnectionService'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { ConnectionService } from '@/services/ConnectionService'

export async function GET(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions)
    const url = new URL(req.url)

    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const offset = parseInt(url.searchParams.get('offset') || '10')

    const connections = await ConnectionService.findManyByUserIdFromCreator(
      session.user.id,
      limit,
      offset
    )
    const total = await ConnectionService.findManyByUserIdFromCreator(
      session.user.id,
    )
    const totalAgencies = total.length

    const hasMore = true

    console.log(connections)

    return NextResponse.json({ connections, totalAgencies, hasMore })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      },
    )
  }
}

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions)

  try {
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    const { userId1, userId2, id } = await req.json()

    const connection = await db.connection.findFirst({
      where: {
        userId1: userId1,
        userId2: userId2,
      },
    })

    if (connection) {
      const updatedConnection = await db.connection.update({
        where: {
          id: connection.id,
        },
        data: {
          userId1: userId1,
          userId2: userId2,
        },
      })

      console.log('Registro actualizado:', updatedConnection)
    } else {
      const newConnection = await db.connection.create({
        data: {
          userId1: userId1,
          userId2: userId2,
        },
      })

      console.log('Nuevo registro creado:', newConnection)
    }

    const instagramPages =
      await SocialConnectionService.findInstagramPages(userId2)
    const instgramToken =
      await SocialConnectionService.findInstagramToken(userId2)

    console.log('PAGES:', instagramPages)
    console.log('TOKEN:', instgramToken)

    for (const instagramPage of instagramPages!) {
      const res = await fetch('https://dev.codecoco.co/api/collect/instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instagramPage: instagramPage.id,
          instgramToken: instgramToken,
          sessionId: userId1,
        }),
      })
    }

    return NextResponse.json({ success: true, connection })
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

export async function DELETE(req: Request, res: Response) {
  const session = await getServerSession(authOptions)

  const { userId1, userId2 } = await req.json()

  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const connection = await db.connection.findFirst({
      where: {
        userId1: userId1,
        userId2: userId2,
      },
    })

    if (connection) {
      const delteConnection = await db.connection.delete({
        where: {
          id: connection.id,
        },
      })

      return NextResponse.json({ success: true, delteConnection })
    }

    return NextResponse.json({ success: true, connection })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      },
    )
  }
}
