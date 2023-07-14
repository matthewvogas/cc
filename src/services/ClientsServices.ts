import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'

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
}
