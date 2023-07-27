import { CampaignsService } from '@/services/CampaignsService'
import { ptMono } from '@/app/fonts'
import CampaingsTabs from '@/components/tabs/CampaingTabs'
import TitlePage from '@/components/titlePage'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { CreatorsService } from '@/services/CreatorsService'

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

    return (
      <div className='overflow-clip'>
        <div>
          <TitlePage
            title={String(campaign?.name)}
            moduleText={'singleCampaign'}
            client={String(campaign?.client?.name)}
            createClient={null}
            createCampaign={null}
            setSort={null}
          />
          <div className='divider' />
        </div>

        <div className=''>
          <CampaingsTabs campaign={campaign} creators={creators} />
        </div>
      </div>
    )
  } catch (err: any) {
    return <div className='text-center'>404 {err.message}</div>
  }
}
