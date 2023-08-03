import db from '@/lib/db'
import { Posts } from '@/types/posts/PostByCampaignRes'

export class PostsService {
  static async findMany(campaignId: number, limit?: number, offset?: number) {
    const posts = await db.post.findMany({
      where: {
        campaignId: +campaignId,
      },
      include: {
        creator: true,
      },
    })

    return posts as Posts[]
  }
}
