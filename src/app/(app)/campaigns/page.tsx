import CampaignCard from '@/components/campaignCard'
import Sidebar from '@/components/sidebar'
import TitlePage from '@/components/titlePage'

export default async function campaigns() {
  return (
    <div className='flex flex-col gap-4'>
      <TitlePage title='campaigns' />
      <CampaignCard/>

    </div>
  )
}
