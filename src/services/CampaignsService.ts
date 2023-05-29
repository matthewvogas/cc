import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'

//Service that the constructor get a session id

export class CamapignsService {
  private readonly sessionId: number

  constructor(sessionID: number) {
    this.sessionId = sessionID
  }

  async findMany(limit?: number, offset?: number) {
    return prisma.campaign.findMany({
      where: {
        tenant_id: parseInt(this.sessionId as unknown as string),
      },
      orderBy: {
        created_at: 'desc',
      },
      take: limit,
      skip: offset,
    })
  }

  async findUnique(id: number) {
    return prisma.campaign.findUniqueOrThrow({
      where: {
        id: parseInt(id as unknown as string),
      },
      include: {
        posts: true,
      },
    })
  }
}
