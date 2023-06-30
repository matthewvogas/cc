import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import CampaignsDashBoard from '@/components/dashboards/CampaignsDashBoard'
import { CampaignsService } from '@/services/CampaignsService'
import { ClientsService } from '@/services/ClientsServices'
import { getServerSession } from 'next-auth'

export const dynamic = 'force-dynamic'

export default async function CampaignPage() {
  const session = await getServerSession(authOptions)
  const campaigns = await CampaignsService.findMany(session!.user.id)
  const clients = await ClientsService.findMany(session!.user.id)

  return (
    <CampaignsDashBoard
      campaignsFallback={campaigns}
      clientsFallback={clients}
    />
  )
}
