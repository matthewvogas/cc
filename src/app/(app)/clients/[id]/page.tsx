import ButtonGroup from '@/components/buttonsGroup'
import CreatorCard from '@/components/postCard'
import OverviewCampaign from '@/components/overviewCampaign'
import TitleSingleClient from '@/components/titleSingleClient'
import ClientStat from '@/components/clientStat'
import FilterCreators from '@/components/filtersCreators'
import CreatorRow from '@/components/creatorRow'

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
      <TitleSingleClient title={`Revolve Clothing`} onSubmit={undefined} />
      <ClientStat title={'at glance'} />
      <FilterCreators />
      <CreatorRow />
    </div>
  )
}
