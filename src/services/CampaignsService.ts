import db from '@/lib/db'

//Service that the constructor get a session id

export class CampaignsService {
  static async findMany(userId: string, limit?: number, offset?: number) {
    const campaigns = await db.campaign.findMany({
      where: {
        userId,
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

    return campaigns
  }

  static async findUnique(id: number) {
    const campaign = await db.campaign.findUnique({
      where: {
        id: +id,
      },
      include: {
        client: true,
        posts: {
          include: {
            creator: true,
          }
        },
        _count: {
          select: {
            creators: true,
            posts: true,
          },
        },
      },
    })

    const stats = await db.post.groupBy({
      by: ['campaignId'],
      where: {
        campaignId: +id,
      },
      _sum: {
        likesCount: true,
        commentsCount: true,
        engagementCount: true,
        impressionsCount: true,
        playsCount: true,
        savesCount: true,
        sharesCount: true,
      },
    })

    return {
      ...campaign,
      stats: stats[0]._sum,
    }
  }
}
