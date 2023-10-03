import db from '@/lib/db'
import { SocialPlatform, instagramPages } from '@prisma/client'

//Service that the constructor get a session id

export class SocialConnectionService {

  static async findInstagramToken(userId: string) {
    const socialConnections = await db.socialConnection.findMany({
      where: {
        platform: 'INSTAGRAM' as SocialPlatform,
        userId: userId
      },
    });
  
    if (socialConnections.length > 0) {
      return socialConnections[0].token;
    } else {
      return null; 
    }
  }

  static async findTikTokToken(userId: string) {
    const socialConnections = await db.socialConnection.findMany({
      where: {
        platform: 'TIKTOK' as SocialPlatform,
        userId: userId
      },
    })

    if (socialConnections.length > 0) {
      return socialConnections[0].token;
    } else {
      return null; 
    }
  }


}
