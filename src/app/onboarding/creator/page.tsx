import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Onboarding from './onboarding'
export const dynamic = 'force-dynamic'
import db from '@/lib/db'

export default async function page() {
  const session = await getServerSession(authOptions)

  const accessConnections = await db.accessConnection.findMany({
    where: {
      email: String(session!.user.email),
    },
  })

  for (const connection of accessConnections) {
    const myId = await db.user.findFirst({
      where: {
        email: connection.email,
      },
    })

    const createConnection = await db.connection.findFirst({
      where: {
        userId1: String(myId?.id),
        userId2: session?.user.id,
      },
    })

    const createConnectionEqual = await db.connection.findFirst({
      where: {
        userId2: String(myId?.id),
        userId1: String(connection.userId),
      },
    })

    if (!createConnection || !createConnectionEqual) {
      const findConnect = await db.connection.findFirst({
        where: {
          userId1: String(myId?.id),
          userId2: String(connection.userId),
        },
      })
      if (!findConnect) {
        const createConnect = await db.connection.create({
          data: {
            userId1: String(myId?.id),
            userId2: String(connection.userId),
          },
        })
      } else {
        console.log('connection created')
      }
    } else {
      console.log('Connections done')
    }
  }

  return <Onboarding />
}
