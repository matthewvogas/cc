import ButtonsGroupTabs from '@/components/buttonsGroupTabs'
import CampaignCard from '@/components/campaignCard'
import CreatorRow from '@/components/creatorRow'
import Search from '@/components/search'
import Sidebar from '@/components/sidebar'
import Tags from '@/components/tags'
import TitlePage from '@/components/titlePage'

export default async function clients() {
  return (
    <div className='justify-left items-left flex flex-col gap-4'>
      <TitlePage title={'Clients'} onSubmit={undefined} />
      <div className='md:px-12'>
        <CampaignCard />
      </div>
      <div className='flex gap-6 md:px-12'>
        <Search />
        <Tags />
      </div>
      <CreatorRow />
    </div>
  )
}
