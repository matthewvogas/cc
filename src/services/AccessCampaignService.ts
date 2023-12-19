import db from '@/lib/db'

export class AccessCampaignService {
  static async findAcess(email: string, campaignId: number) {
    const access = await db.accessCampaign.findMany({
      where: {
        email: email,
        CampaignId: +campaignId,
      },
    })

    return access
  }
  static async findAcessToCampaign(campaignId: number) {
    const access = await db.accessCampaign.findMany({
      where: {
        CampaignId: +campaignId,
      },
    })

    return access
  }
}
