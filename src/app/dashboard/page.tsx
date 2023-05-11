import { User } from '../user'
import Sidebar from '@/components/sidebar'
import TitlePage from '@/components/titlePage'
import OptionsBar from '@/components/buttonsGroup'
import CreatorCart from '@/components/creatorCard'
import CampaignCard from '@/components/campaignCard'
import OverviewCampaign from '@/components/overviewCampaign'

export default async function Dashboard() {
  return (
    <section className='flex flex-col items-center justify-center gap-4'>
      <Sidebar />
      <h1>Dashboard page</h1>
    </section>
  )
}
