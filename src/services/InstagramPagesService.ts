import db from '@/lib/db'
import { Prisma, instagramPages } from '@prisma/client'

export class InstagramPagesService {
  
  static async findByUserId(
    userId: string,
    limit?: number,
    offset?: number,
  ) {
    return db.instagramPages.findMany({
      where: {
        userId: userId,
      },
      take: limit,
      skip: offset,
    })
  }

  static async findUnique(
    pageId: string,
    limit?: number,
    offset?: number,
  ) {
    return db.instagramPages.findMany({
      where: {
        accountId: pageId,
      },
      take: limit,
      skip: offset,
    })
  }

}
