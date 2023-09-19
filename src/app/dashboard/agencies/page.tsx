import AgenciesDashBoard from '@/components/dashboards/influencer/AgenciesDashBoard'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import { CreatorsService } from '@/services/CreatorsService'
import { ClientsService } from '@/services/ClientsServices'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { getServerSession } from 'next-auth'

export const dynamic = 'force-dynamic'

export default async function AgenciesPage() {
  const session = await getServerSession(authOptions)
  const campaigns = (await CampaignsService.findMany(
    session!.user.id,
  )) as CampaignRes
  const clients = await ClientsService.findMany(session!.user.id)
  //const creators = await CreatorsService.findMany(session!.user.id)

  return (
    <div>
      { session!.user.role == 'CREATOR' ?
      (
        <AgenciesDashBoard
          campaignsFallback={campaigns}
          clientsFallback={clients}
          // creatorsFallback={creators}
        />
      )
      :
      (
       <p>Para acceder a esta seccion necesitas ser un creador - 404</p>
      )
      }
    </div>
  )
}
