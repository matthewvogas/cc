import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import { CreatorsService } from '@/services/CreatorsService'
import { StoriesService } from '@/services/StoriesService'
import { CampaignRes } from '@/types/campaign/campaignRes'
import TitlePage from '@/components/labels/titlePage'
import { PostsService } from '@/services/PostsSerivce'
import { getServerSession } from 'next-auth'

export const dynamic = 'force-dynamic'

export default async function AgencyPage({
  params,
}: {
  params: { id: number }
}) {
  const { id } = params
  try {
    const campaign = (await CampaignsService.findUnique(id)) as CampaignRes
    const creators = await CreatorsService.findByCampaignId(id)
    const posts = await PostsService.findMany(id)
    const stories = await StoriesService.findByCampaign(id)
    const session = await getServerSession(authOptions)

    return (
      <div className='overflow-clip'>
        <p>Agency Page</p>
      </div>
    )
  } catch (err: any) {
    return <div className='text-center'>404 {err.message}</div>
  }
}
