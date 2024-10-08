import db from '@/lib/db'

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
        creators: true,
        posts: true,
        _count: {
          select: {
            creators: true,
            posts: true,
            stories: true,
          },
        },
      },
      take: limit,
      skip: offset,
    })

    return campaigns
  }

  static async findManyByClient(
    client: number,
    limit?: number,
    offset?: number,
  ) {
    const campaigns = await db.campaign.findMany({
      where: {
        clientId: +client,
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
        stories: true,
        creators: true,
        posts: {
          include: {
            creator: true,
          },
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
      stats: stats[0]?._sum,
    }
  }
}
