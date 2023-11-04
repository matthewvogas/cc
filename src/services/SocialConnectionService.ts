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

  static async findInstagram(userId: string) {
    const socialConnections = await db.socialConnection.findMany({
      where: {
        platform: 'INSTAGRAM' as SocialPlatform,
        userId: userId
      },
    });
  
    if (socialConnections.length > 0) {
      return socialConnections[0];
    } else {
      return null; 
    }
  }

  static async findTikTok(userId: string) {
    const socialConnections = await db.socialConnection.findMany({
      where: {
        platform: 'TIKTOK' as SocialPlatform,
        userId: userId
      },
    });
  
    if (socialConnections.length > 0) {
      return socialConnections[0];
    } else {
      return null; 
    }
  }

  static async findInstagramPages(userId: string) {
    const socialConnections = await db.socialConnection.findMany({
      where: {
        platform: 'INSTAGRAM' as SocialPlatform,
        userId: userId
      },
      include: {
        instagramPages: true
      }
    });
  
    if (socialConnections.length > 0) {
      return socialConnections[0].instagramPages;
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
