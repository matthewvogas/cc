import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import { CreatorsService } from '@/services/CreatorsService'
import CampaingsTabs from '@/components/tabs/CampaingTabs'
import { StoriesService } from '@/services/StoriesService'
import { CampaignRes } from '@/types/campaign/campaignRes'
import TitlePage from '@/components/labels/titlePage'
import { PostsService } from '@/services/PostsSerivce'
import { getServerSession } from 'next-auth'
import { ClientsService } from '@/services/ClientsServices'
import { ConnectionService } from '@/services/ConnectionService'
import { AccessCampaignService } from '@/services/AccessCampaignService'

export const dynamic = 'force-dynamic'

export default async function CampaignPage({
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
    const client = await ClientsService.findUnique(params.id)
    const connections = await ConnectionService.findManyByUserId(session!.user.id)
    const access = await AccessCampaignService.findAcessToCampaign(id)

    return (
      <div className='overflow-clip'>
        <div>
          <TitlePage
            title={String(campaign?.name)}
            moduleText={'singleCampaign'}
            client={campaign?.client}
            clientsFallback={null}
            campaignsFallback={null}
            setSort={null}
          />
          <div className='divider' />
        </div>

        <div className=''>
          <CampaingsTabs
            campaign={campaign}
            creators={creators}
            posts={posts}
            stories={stories}
            session={session}
            client={client}
            connections={connections}
            access={access}
          />
        </div>
      </div>
    )
  } catch (err: any) {
    return <div className='text-center'>404 {err.message}</div>
  }
}
