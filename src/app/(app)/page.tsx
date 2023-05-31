import ActionalTitle from '@/components/actionalTitle'
import CampaignCard from '@/components/campaignCard'
import DashboardCampaign from '@/components/campaignDashboard'
import ClientStat from '@/components/clientStat'
import TitleDashboard from '@/components/titleDashboard'

export default async function Home() {
  return (
    <div className='justify-left flex h-full w-full flex-col  gap-4 bg-white'>
      <TitleDashboard title={''} onSubmit={undefined} />
      <ActionalTitle title={'your campaigns'} />
      <DashboardCampaign />
      <ActionalTitle title={'your clients'} />
      <div className='px-14'>
        <CampaignCard />
      </div>
      <ActionalTitle title={'stats at a glance'} />
      <ClientStat />
    </div>
  )
}
