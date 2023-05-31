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
    <div className='flex flex-col justify-start '>
      <TitleSingleClient title={`Revolve Clothing`} onSubmit={undefined} />
      <p className=' px-12 mb-4 italic' >stats et glance</p>
      <div className='w-full px-12 gap-4 flex '>
      <ClientStat  />
      <ClientStat  />
      <ClientStat  />
      </div>
      <FilterCreators />
      <CreatorRow />
    </div>
  )
}
