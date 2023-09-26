import db from '@/lib/db'

export class ConnectionService {
  static async findUnique(id: string) {
    const connection = db.connection.findUnique({
      where: {
        id,
      },
    })
    return connection
  }

  static async findManyByUserId(userId1: string) {
    const connections = await db.connection.findMany({
      where: {
        userId2: userId1,
      },
      include: {
        user1: {
          include: {
            socialConnections: true,
          },
        },
        user2: {
          include: {
            campaigns: true,
            socialConnections: true,
          },
        },
      },
    })

    return connections
  }

  static async findManyTokensByUserId(userId1: string) {
    const connections = await db.connection.findMany({
      where: {
        userId1: userId1,
      },
    })

    return connections
  }
}
