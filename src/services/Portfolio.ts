import db from '@/lib/db'
export class PortfolioService {
  static async getData(userId: string) {
    const data = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    return data
  }
}
