import ButtonsGroupTabs from '@/components/buttonsGroupTabs'
import CampaignCard from '@/components/campaignCard'
import CreatorRow from '@/components/creatorRow'
import Search from '@/components/search'
import Tags from '@/components/tags'
import TitlePage from '@/components/titlePage'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { ClientsService } from '@/services/ClientsServices'
import ClientsDashBoard from '@/components/dashboards/ClientsDashBoard'

export const dynamic = 'force-dynamic'

export default async function clients() {
  const session = await getServerSession(authOptions)

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  })

  const clientsService = new ClientsService(currentUser!.id)

  const clients = await clientsService.findMany()

  return <ClientsDashBoard clientsFallback={clients} />
}
