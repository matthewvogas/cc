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
      {campaign.id ? (
        <SharedCampaign campaign={campaign}></SharedCampaign>
      ) : (
        <div className='flex justify-center items-center h-screen bg-[#F3F0EC]'>
          <h3 className='text-lg px-6 py-3  bg-[#8a7356] text-white shadow-xl  rounded-xl'>
            Hello! it is possible that this campaign does not exist, sorry
          </h3>
        </div>
      )}
    </div>
  )
}
