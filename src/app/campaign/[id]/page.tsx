import db from '@/lib/db'
import { SharedCampaign } from './sharedCampaign'
import { CampaignsService } from '@/services/CampaignsService'
import { CampaignRes } from '@/types/campaign/campaignRes'

export default async function shareCampaign({
  params,
}: {
  params: { id: number }
}) {
  const { id } = params

  const campaign = (await CampaignsService.findUnique(id)) as CampaignRes

  return (
    <div>
      <SharedCampaign campaign={campaign}></SharedCampaign>
    </div>
  )
}
