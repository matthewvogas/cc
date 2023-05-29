import ButtonGroup from '@/components/buttonsGroup'
import CreatorCard from '@/components/postCard'
import OverviewCampaign from '@/components/overviewCampaign'
import TitlePage from '@/components/titlePage'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CamapignsService } from '@/services/CampaignsService'
import ButtonsGroupTabs from '@/components/buttonsGroupTabs'

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
        <TitlePage title={campaign.name} />
        <ButtonsGroupTabs />
      </div>
    )
  } catch (err) {
    return <div className='text-center'>404</div>
  }
}
