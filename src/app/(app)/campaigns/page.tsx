import AddNewCampaign from '@/components/modals/addNewCampaign'
import CampaignCard from '@/components/campaignCard'
import TitlePage from '@/components/titlePage'
import FilterBy from '@/components/modals/filterBy'

export default async function campaigns() {
  return (
    <div className='flex h-full flex-col gap-4 bg-white'>
      <TitlePage title='Campaigns' />
      <FilterBy />
      <CampaignCard />
    </div>
  )
}
