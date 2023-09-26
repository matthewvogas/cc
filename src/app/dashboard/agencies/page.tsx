import AgenciesDashBoard from '@/components/dashboards/influencer/AgenciesDashBoard'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import { CreatorsService } from '@/services/CreatorsService'
import { ClientsService } from '@/services/ClientsServices'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { getServerSession } from 'next-auth'
import { ConnectionService } from '@/services/ConnectionService'

export const dynamic = 'force-dynamic'

export default async function AgenciesPage() {
  const session = await getServerSession(authOptions)
  
  const connections = await ConnectionService.findManyByUserId(
    String(session?.user.id),
  )

  return (
    <div>
      {session!.user.role == 'CREATOR' ? (
        <AgenciesDashBoard agenciesConnections={connections} />
      ) : (
        <p>Para acceder a esta seccion necesitas ser un creador - 404</p>
      )}
    </div>
  )
}
