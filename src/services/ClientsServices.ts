import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'

//Service that the constructor get a session id

export class ClientsService {

  static async findMany(userId:string, limit?: number, offset?: number) {
    return db.client.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            campaigns: true,
          },
        },
        campaigns: true,
      },
      take: limit,
      skip: offset,
    })
  }

  static async findUnique(id: number) {
    return db.client.findUniqueOrThrow({
      where: {
        id: parseInt(id.toString()),
      },
      include: {
        campaigns: true,
        _count: {
          select: { campaigns: true },
        },
      },
    })
  }
}
