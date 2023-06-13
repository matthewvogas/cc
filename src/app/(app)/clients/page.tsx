import ButtonsGroupTabs from '@/components/buttonsGroupTabs'
import CampaignCard from '@/components/campaignCard'
import CreatorRow from '@/components/creatorRow'
import Search from '@/components/search'
import Tags from '@/components/tags'
import TitlePage from '@/components/titlePage'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { ClientsService } from '@/services/ClientsServices'
import ClientsDashBoard from '@/components/dashboards/ClientsDashBoard'

export const dynamic = 'force-dynamic'

export default async function clients() {
  const session = await getServerSession(authOptions)
  const clientsService = new ClientsService(session!.user.id)
  const clients = await clientsService.findMany()

  return <ClientsDashBoard clientsFallback={clients} />
}
