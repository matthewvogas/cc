import AgenciesDashBoard from '@/components/dashboards/influencer/AgenciesDashBoard'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import { CreatorsService } from '@/services/CreatorsService'
import { ClientsService } from '@/services/ClientsServices'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { getServerSession } from 'next-auth'
import { ConnectionService } from '@/services/ConnectionService'
import { UserService } from '@/services/UsersService'
import { SocialConnectionService } from '@/services/SocialConnectionService'

export const dynamic = 'force-dynamic'

export default async function AgenciesPage() {
  const session = await getServerSession(authOptions)

  const connections = await ConnectionService.findManyByUserId(
    String(session?.user.id),
  )

  const InstagramConnection = await SocialConnectionService.findInstagramToken(
    String(session?.user.id),
  )

  // esto retorna el token null, verificar si es null entonces mostrar el boton, si esta el token entonces mostrar que ya esta conectado

  const agencies = await UserService.findManyAgencies()

  return (
    <div>
      {session!.user.role == 'CREATOR' ? (
        <AgenciesDashBoard
          agenciesConnections={connections}
          agency={agencies}
          session={session?.user?.id}
          instagramConnection={InstagramConnection}
        />
      ) : (
        <p>Para acceder a esta seccion necesitas ser un creador - 404</p>
      )}
    </div>
  )
}
