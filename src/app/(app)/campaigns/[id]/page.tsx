import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CamapignsService } from '@/services/CampaignsService'
import ButtonsGroupTabs from '@/components/buttonsGroupTabs'
import { ptMono } from '@/app/fonts'
import CampaingsTabs from '@/components/tabs/CampaingTabs'
import TitlePage from '@/components/titlePage'

export const dynamic = 'force-dynamic'

export default async function CampaignPage({
  params,
}: {
  params: { id: number }
}) {
  const { id } = params

  const session = await getServerSession(authOptions)
  const CampaignsService = new CamapignsService(session!.user.id)

  try {
    const campaign = await CampaignsService.findUnique(id)

    return (
      <div className='flex flex-col items-center justify-center'>
        <TitlePage
          title={String(campaign?.name)}
          moduleText={'singleCampaign'}
          client={String(campaign?.client?.name)}
          createClient={null}
          createCampaign={null}
        />

        <div className='divider' />
        <CampaingsTabs campaign={campaign} />
      </div>
    )
  } catch (err: any) {
    return <div className='text-center'>404 {err.message}</div>
  }
}
