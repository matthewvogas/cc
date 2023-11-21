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

  static async findAllPosts() {
    const posts = await db.post.findMany()
    return posts
  }

  static async findAllPostsFromUser(userId: string) {
    const posts = await db.post.findMany({
      where: {
        userId: userId,
      },
    })
    return posts
  }

  static async findReachFromAllPosts() {
    const allPosts = await PostsService.findAllPosts()
    let totalReachCount = 0

    allPosts.forEach(post => {
      if (post.reachCount) {
        totalReachCount += post.reachCount
      }
    })

    return totalReachCount
  }

  static async findViewsFromAllPosts() {
    const allPosts = await PostsService.findAllPosts()
    let totalImpressionsCount = 0

    allPosts.forEach(post => {
      if (post.impressionsCount) {
        totalImpressionsCount += post.impressionsCount
      }
    })

    return totalImpressionsCount
  }

  static async findAllViewsFromUser(userId: string) {
    const allPosts = await PostsService.findAllPostsFromUser(userId)
    let totalImpressionsCount = 0

    allPosts.forEach(post => {
      if (post.impressionsCount) {
        totalImpressionsCount += post.impressionsCount
      }
    })

    return totalImpressionsCount
  }

  static async findCommentsFromAllPosts() {
    const allPosts = await PostsService.findAllPosts()
    let totalCommentsCount = 0

    allPosts.forEach(post => {
      if (post.commentsCount) {
        totalCommentsCount += post.commentsCount
      }
    })

    return totalCommentsCount
  }

  static async findEngagementRateFromAllPosts() {
    const allPosts = await PostsService.findAllPosts()
    let engagementRate = 0

    allPosts.forEach(post => {
      if (post.commentsCount) {
        engagementRate += post.commentsCount
      }
    })

    return engagementRate * (await PostsService.findAllPosts()).length
  }

  static async findByUser(userId: string, limit?: number, offset?: number) {
    const posts = await db.post.findMany({
      where: {
        userId: userId,
      },
      include: {
        creator: true,
      },
    })

    return posts as Posts[]
  }
}
