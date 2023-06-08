import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import CampaignsDashBoard from '@/components/dashboards/CampaignsDashBoard'
import prisma from '@/lib/prisma'
import { CamapignsService } from '@/services/CampaignsService'
import { ClientsService } from '@/services/ClientsServices'
import { getServerSession } from 'next-auth'

export const dynamic = 'force-dynamic'

export default async function CampaignPage() {
  const session = await getServerSession(authOptions)

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  })

  const campaignsService = new CamapignsService(currentUser!.id)
  const clientsService = new ClientsService(currentUser!.id)

  const campaigns = await campaignsService.findMany()
  const clients = await clientsService.findMany()

  return <CampaignsDashBoard campaigns={campaigns} clients={clients} />
}
