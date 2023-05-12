import CampaignCard from '@/components/campaignCard'
import TitlePage from '@/components/titlePage'

export default async function campaigns() {
  return (
    <div className='flex h-full w-full flex-col gap-4 bg-white'>
      <TitlePage title='Campaigns' />
      <CampaignCard />
    </div>
  )
}
