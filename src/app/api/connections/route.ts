import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { SocialConnectionService } from '@/services/SocialConnectionService'

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions)

  try {
    const { userId1, userId2 } = await req.json()

    // Busca un registro basado en userId1 y userId2
    const connection = await db.connection.findFirst({
      where: {
        userId1: userId1,
        userId2: userId2,
      },
    })

    if (connection) {
      // Si el registro existe, actualiza sus propiedades
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

      // El registro ha sido creado
      console.log('Nuevo registro creado:', newConnection)
    }

    const instagramPages =
      await SocialConnectionService.findInstagramPages(userId2)
    const instgramToken =
      await SocialConnectionService.findInstagramToken(userId2)

    console.log('PAGES:', instagramPages)
    console.log('TOKEN:', instgramToken)

    for (const instagramPage of instagramPages!) {
      const res = await fetch('http://localhost:3000/api/collectPosts', {
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
