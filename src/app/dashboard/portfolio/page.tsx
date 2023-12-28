import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import { ClientsService } from '@/services/ClientsServices'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { getServerSession } from 'next-auth'
import PortfolioTabs from './PortfolioTabs'
import { InstagramPagesService } from '@/services/InstagramPagesService'
import { ConnectionService } from '@/services/ConnectionService'
import { SocialConnectionService } from '@/services/SocialConnectionService'

export const dynamic = 'force-dynamic'

export default async function CampaignPage() {
  const session = await getServerSession(authOptions)
  const campaigns = (await CampaignsService.findMany(
    session!.user.id,
  )) as CampaignRes
  const clients = await ClientsService.findMany(session!.user.id)
  const instagramPages = await InstagramPagesService.findByUserId(
    String(session?.user.id),
  )
  const token = await SocialConnectionService.findInstagramToken(
    session!.user.id,
  )

  return <div>{session!.user.role == 'CREATOR' ? <PortfolioTabs clients={clients} campaigns={campaigns} instagramPages={instagramPages} tokenIg={token} /> : null}</div>
}
