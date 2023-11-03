import db from '@/lib/db'

//Service that the constructor get a session id

export class ClientsService {
  static async findMany(userId: string, limit?: number, offset?: number) {
    return db.client.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        tags: true,
        _count: {
          select: {
            campaigns: true,
            creators: true,
          },
        },
        campaigns: true,
      },
      take: limit,
      skip: offset,
    })
  }

  static async findUnique(id: number) {
    const client = await db.client.findUnique({
      where: {
        id: +id,
      },
      include: {
        _count: {
          select: {
            campaigns: true,
            creators: true,
            tags: true,
          },
        },
        campaigns: true,
        creators: true,
        tags: true,
      },
    })

    return client
  }

  static async deleteClientById(clientId: number) {
    try {
      await db.client.delete({
        where: {
          id: clientId,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
}
