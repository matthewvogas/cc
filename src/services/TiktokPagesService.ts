import db from '@/lib/db'

export class TiktokPagesService {
  
  static async findByUserId(
    userId: string,
    limit?: number,
    offset?: number,
  ) {
    return db.tiktokPages.findMany({
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
    return db.tiktokPages.findMany({
      where: {
        accountId: pageId,
      },
      take: limit,
      skip: offset,
    })
  }

  static async findAll(
    ) {
      return db.tiktokPages.findMany({
        where: {
          
        }
      })
    }

}
