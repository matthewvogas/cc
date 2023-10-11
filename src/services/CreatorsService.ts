import db from '@/lib/db'
import { CreatorsByCampaignRes } from '@/types/creators/CreatorsByCampaignRes'

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

  static async findByCampaignId(campaignId: number) {
    const creators = await db.creator.findMany({
      where: {
        campaigns: {
          some: {
            id: +campaignId,
          },
        },
      },
      include: {
        _count: {
          select: {
            posts: {
              where: {
                campaignId: +campaignId,
              },
            },
          },
        },
      },
    })

    return creators
  }

  static async deleteCreatorById(creatorId: number, userId: string) {
    try {
      await db.creator.delete({
        where: {
          id: creatorId,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async getCreatorsByCampaignId(campaignId: number) {
    try {
      const campaign = await db.campaign.findUnique({
        where: {
          id: campaignId,
        },
        include: {
          creators: true,
        },
      })

      if (campaign) {
        throw new Error('Campaign Not Found!')
      }
    } catch (error: any) {
      throw new Error(
        `Failed to fetch creators by campaign ID: ${error.message}`,
      )
    }
  }

  static async findById(creatorId: number) {
    try {
      const creator = await db.creator.findUnique({
        where: {
          id: creatorId,
        },
      })
      return creator
    } catch (error) {
      console.error('Error fetching creator by ID:', error)
      throw error
    }
  }
}
