import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import CampaignsDashBoard from '@/components/dashboards/CampaignsDashBoard'
import { CampaignsService } from '@/services/CampaignsService'
import { ClientsService } from '@/services/ClientsServices'
import { CreatorsService } from '@/services/CreatorsService'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { getServerSession } from 'next-auth'

export const dynamic = 'force-dynamic'

export default async function CampaignPage() {
  const session = await getServerSession(authOptions)
  const campaigns = (await CampaignsService.findMany(
    session!.user.id,
  )) as CampaignRes
  const clients = await ClientsService.findMany(session!.user.id)
  //const creators = await CreatorsService.findMany(session!.user.id)

  return (
    <CampaignsDashBoard
      campaignsFallback={campaigns}
      clientsFallback={clients}
      // creatorsFallback={creators}
    />
  )
}
