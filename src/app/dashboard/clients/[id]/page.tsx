import { getServerSession } from 'next-auth'
import { ClientsService } from '@/services/ClientsServices'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ClientTabs from '@/components/tabs/ClientTabs'
import { CampaignsService } from '@/services/CampaignsService'

export const dynamic = 'force-dynamic'

export default async function CampaignPage({
  params,
}: {
  params: { id: number }
}) {
  const session = await getServerSession(authOptions)
  const client = await ClientsService.findUnique(params.id)
  const campaigns = await CampaignsService.findManyByClient(params.id)

  return <ClientTabs client={client} campaigns={campaigns} />
}
