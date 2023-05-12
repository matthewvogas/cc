import CampaignCard from '@/components/campaignCard'
import TitlePage from '@/components/titlePage'

export default async function campaigns() {
  return (
    <div className='flex flex-col gap-4 w-full h-full bg-white'>
      <TitlePage title='Campaigns' />
      <CampaignCard/>
    </div>
  )
}
