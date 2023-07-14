import db from '@/lib/db'

export class CreatorsService {
  static async findMany(userId: string, limit?: number, offset?: number) {
    return db.creator.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            campaigns: {
              where: {
                userId,
              },
            },
            clients: {
              where: {
                userId,
              },
            },
            posts: {
              where: {
                userId,
              },
            },
            users: true,
          },
        },
      },
      take: limit,
      skip: offset,
    })
  }

  static async findUnique(id: number, userId: string) {
    const creator = await db.creator.findUnique({
      where: {
        id,
      },
      include: {
        campaigns: {
          where: {
            userId,
          },
        },
        clients: {
          where: {
            userId,
          },
        },
        posts: {
          where: {
            userId,
          },
        },
      },
    })

    return creator
  }
}
