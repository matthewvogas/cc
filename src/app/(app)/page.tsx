import ActionalTitle from '@/components/actionalTitle'
import CampaignCard from '@/components/campaignCard'
import DashboardCampaign from '@/components/campaignDashboard'
import ClientCard from '@/components/clientCard'
import ClientStat from '@/components/clientStat'
import TitleDashboard from '@/components/titleDashboard'
import Spinner from '@/components/ui/spinner'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { CamapignsService } from '@/services/CampaignsService'
import { ClientsService } from '@/services/ClientsServices'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const campaignsService = new CamapignsService(session!.user.id)
  const clientsService = new ClientsService(session!.user.id)
  const campaigns = await campaignsService.findMany()
  const clients = await clientsService.findMany()

  return (
    <div className='justify-left flex h-full w-full flex-col  gap-4 bg-white'>
      <TitleDashboard title={''} user={session?.user!} />
      <ActionalTitle title={'your campaigns'} />
      <DashboardCampaign campaignsFallback={campaigns} />
      <ActionalTitle title={'your clients'} />
      <div className='px-14'>
        <ClientCard clientsFallback={clients} />
      </div>
    </div>
  )
}
