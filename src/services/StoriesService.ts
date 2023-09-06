import db from '@/lib/db'
import { Prisma, Story } from '@prisma/client'

export class StoriesService {
  static async findByCampaign(
    campaignId: number,
    limit?: number,
    offset?: number,
  ) {
    return db.story.findMany({
      where: {
        campaignId: +campaignId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    })
  }

  static async create(data: Prisma.StoryCreateInput): Promise<Story | null> {
    return db.story.create({
      data,
    })
  }
}
