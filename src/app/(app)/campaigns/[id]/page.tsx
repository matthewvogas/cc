import ButtonGroup from '@/components/buttonsGroup'
import CreatorCard from '@/components/postCard'
import OverviewCampaign from '@/components/overviewCampaign'
import TitlePage from '@/components/titlePage'

export default async function CampaignPage({
  params,
}: {
  params: { id: number }
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/campaigns/${params.id}`,
  )
  const campaign = await res.json()

  return (
    <div className='flex flex-col items-center justify-center'>
      <TitlePage title={campaign.name} />
      <ButtonGroup title='' />
      <OverviewCampaign description={campaign.description} />
      <ButtonGroup title='Grid' />
      <CreatorCard posts={campaign.posts} />
    </div>
  )
}
