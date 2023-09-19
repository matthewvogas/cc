import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
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
  //const creators = await CreatorsService.findMany(session!.user.id)

  return (
    <div>
      { session!.user.role == 'CREATOR' ?
      (
        <p>portfolio page</p>
      )
      :
      (
        null
      )
      }
    </div>
  )
}
