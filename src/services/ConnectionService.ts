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

  static async findManyByUserId(UserId: string) {
    const connections = await db.connection.findMany({
      where: {
        userId2: UserId,
      },
      include: {
        user1: {
          include: {
            campaigns: true,
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

  static async findManyByUserIdFromCreator(UserId: string) {
    const connections = await db.connection.findMany({
      where: {
        userId2: UserId,
      },
      include: {
        user1: {
          include: {
            campaigns: {
              include : {
                posts: {
                  include: {
                    creator: true
                  }
                },
                user: true,
              }
            },
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
  static async findManyByUserIdFromAgency(UserId: string) {
    const connections = await db.connection.findMany({
      where: {
        userId1: UserId,
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
            instagramPages: true
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
      include: {
        user2: {
          include: {
            campaigns: true,
            socialConnections: true,
            instagramPages: true
          },
        },
      }
    })

    return connections
  }
}

async function getAcceptedConnections() {
  const acceptedConnections = await db.connection.findMany({
    where: {},
  })

  return acceptedConnections
}
