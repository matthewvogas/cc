import ActionalTitle from '@/components/actionalTitle'
import CampaignCard from '@/components/campaignCard'
import DashboardCampaign from '@/components/campaignDashboard'
import ClientCard from '@/components/clientCard'
import ClientStat from '@/components/clientStat'
import TitleDashboard from '@/components/titleDashboard'
import Spinner from '@/components/ui/spinner'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { CamapignsService } from '@/services/CampaignsService'
import { ClientsService } from '@/services/ClientsServices'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    }
  })

  const campaignsService = new CamapignsService(currentUser!.id)
  const clientsService = new ClientsService(currentUser!.id)

  const campaigns = await campaignsService.findMany()
  const clients = await clientsService.findMany()

  return (
    <div className='justify-left flex h-full w-full flex-col  gap-4 bg-white'>
      <TitleDashboard title={''} user={currentUser!}/>
      <ActionalTitle title={'your campaigns'} />
      <DashboardCampaign campaignsWithPosts={campaigns} />
      <ActionalTitle title={'your clients'} />
      <div className='px-14'>
        <ClientCard clients={clients} />
      </div>
    </div>
  )
}
