import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'

//Service that the constructor get a session id

export class ClientsService {
  private readonly sessionId: string | undefined

  constructor(sessionID: string) {
    this.sessionId = sessionID
  }

  async findMany(limit?: number, offset?: number) {
    return prisma.client.findMany({
      where: {
        userId: this.sessionId!,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    })
  }

  async findUnique(id: number) {
    return prisma.client.findUniqueOrThrow({
      where: {
        id: parseInt(id.toString()),
      },
      include: {
        campaigns: true,
        _count: {
          select: { campaigns: true },
        }
      }
    })
  }
}
