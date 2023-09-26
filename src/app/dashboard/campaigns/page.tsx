import CampaignsDashBoardInfluencer from '@/components/dashboards/influencer/CampaignsDashBoard'
import CampaignsDashBoard from '@/components/dashboards/agency/CampaignsDashBoard'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { ConnectionService } from '@/services/ConnectionService'
import { CampaignsService } from '@/services/CampaignsService'
import { CreatorsService } from '@/services/CreatorsService'
import { ClientsService } from '@/services/ClientsServices'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { getServerSession } from 'next-auth'

export const dynamic = 'force-dynamic'

export default async function CampaignPage() {
  const session = await getServerSession(authOptions)
  const campaigns = (await CampaignsService.findMany(
    session!.user.id,
  )) as CampaignRes
  const clients = await ClientsService.findMany(session!.user.id)
  
  const connections = await ConnectionService.findManyByUserId(
    String(session?.user.id),
  )

  return (
    <div>
      { session!.user.role == 'CREATOR' ?
      (
        <CampaignsDashBoardInfluencer
          campaignsFallback={connections}
          // creatorsFallback={creators}
        />
      )
      :
      (
        <CampaignsDashBoard
        campaignsFallback={campaigns}
        clientsFallback={clients}
        // creatorsFallback={creators}/>
        />
      )
      }
    </div>
  )
}
