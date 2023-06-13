import db from '@/lib/db'

//Service that the constructor get a session id

export class CamapignsService {
  private readonly sessionId: string
  constructor(sessionID: string) {
    this.sessionId = sessionID
  }

  async findMany(limit?: number, offset?: number) {
    return db.campaign.findMany({
      where: {
        userId: this.sessionId!,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            creators: true,
            posts: true,
          },
        },
      },
      take: limit,
      skip: offset,
    })
  }

  async findUnique(id: number) {
    const [campaign, stats] = await Promise.all([
      db.campaign.findUniqueOrThrow({
        where: {
          id: parseInt(id.toString()),
        },
        include: {
          _count: {
            select: {
              creators: true,
              posts: true,
            },
          },
          posts: true,
          client: true,
          creators: true,
        },
      }),
      this.getStats(id),
    ])

    return {
      ...campaign,
      ...stats,
    }
  }

  async getStats(id: number) {
    const [postCount, creatorsCount, engagement] = await Promise.all([
      db.post.count({
        where: {
          campaignId: parseInt(id.toString()),
        },
      }),
      db.post.groupBy({
        by: ['username'],
        where: {
          campaignId: parseInt(id.toString()),
        },
        _count: {
          username: true,
        },
      }),
      db.post.aggregate({
        where: {
          campaignId: parseInt(id.toString()),
        },
        _sum: {
          likesCount: true,
          commentsCount: true,
        },
      }),
    ])

    return {
      stats: {
        postCount,
        creatorsCount: creatorsCount.length,
        engagement: {
          likes: engagement._sum?.likesCount || 0,
          comments: engagement._sum?.commentsCount || 0,
        },
      },
    }
  }
}
