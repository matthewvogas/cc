import db from '@/lib/db'
import { SharedCampaign } from './sharedCampaign'
import { CampaignsService } from '@/services/CampaignsService'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { PostsService } from '@/services/PostsSerivce'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CreatorsByCampaignRes } from '@/types/creators/CreatorsByCampaignRes'
import { CreatorsService } from '@/services/CreatorsService'
import { getServerSession } from 'next-auth'
import { ConnectionService } from '@/services/ConnectionService'

export default async function shareCampaign({
  params,
}: {
  params: { id: number }
}) {
  const { id } = params
  const creators = (await CreatorsService.findByCampaignId(
    id,
  )) as CreatorsByCampaignRes[]

  const session = await getServerSession(authOptions)

  const connections = await ConnectionService.findManyByUserIdFromCreator(
    String(session?.user.id),
  )
  const campaign = (await CampaignsService.findUnique(id)) as CampaignRes
  const posts = await PostsService.findMany(id)

  return (
    <div>
      {campaign.id ? (
        <SharedCampaign
          user={session?.user}
          campaign={campaign}
          posts={posts}
          creators={creators}
          connections={connections}></SharedCampaign>
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
