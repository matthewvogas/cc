import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import CampaignsDashBoard from '@/components/dashboards/CampaignsDashBoard'
import { CamapignsService } from '@/services/CampaignsService'
import { ClientsService } from '@/services/ClientsServices'
import { getServerSession } from 'next-auth'

export const dynamic = 'force-dynamic'

export default async function CampaignPage() {
  const session = await getServerSession(authOptions)
  const campaignsService = new CamapignsService(session!.user.id)
  const clientsService = new ClientsService(session!.user.id)

  const campaigns = await campaignsService.findMany()
  const clients = await clientsService.findMany()

  return (
    <CampaignsDashBoard
      campaignsFallback={campaigns}
      clientsFallback={clients}
    />
  )
}
