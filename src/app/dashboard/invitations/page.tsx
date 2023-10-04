import { getPendingInvitationsbyUserId } from '@/services/InviteServices'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import PortfolioTabs from './dashboardInvitations'
import { getServerSession } from 'next-auth'
import { ConnectionService } from '@/services/ConnectionService'
import { SocialConnectionService } from '@/services/SocialConnectionService'
import { UserService } from '@/services/UsersService'
import { ClientsService } from '@/services/ClientsServices'
import { CreatorsService } from '@/services/CreatorsService'
import { CreatorsByCampaignRes } from '@/types/creators/CreatorsByCampaignRes'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { CampaignsService } from '@/services/CampaignsService'

export default async function Invites() {
  
  const session = await getServerSession(authOptions)

  const invites = await getPendingInvitationsbyUserId(session!.user!.id)
  const connections = await ConnectionService.findManyByUserId(
    String(session?.user.id),
  )
  const InstagramConnection = await SocialConnectionService.findInstagramToken(
    String(session?.user.id),
  )
  const clients = await ClientsService.findMany(session!.user.id)
  const agencies = await UserService.findManyAgencies()

  const user = await UserService.findUnique(String(session?.user.id))

  const userCreators = await ConnectionService.findManyByUserIdFromAgency(String(session?.user.id))

  const creators = await UserService.findManyCreators()

  const campaigns = (await CampaignsService.findMany(
    session!.user.id,
  )) as CampaignRes

  return (
    <div>
      <PortfolioTabs
        instagramConnection={InstagramConnection}
        invites={invites}
        session={session}
        agenciesConnections={userCreators}
        agency={agencies}
        clients={clients}
        user={user}
        userCreators={userCreators}
        creators={creators}
        campaigns={campaigns}
        connections={connections}
      />
    </div>
  )
}
