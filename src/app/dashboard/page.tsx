import Stats from '@/components/stats'
import { getServerSession } from 'next-auth'
import ClientCard from '@/components/clientCard'
import { PostsService } from '@/services/PostsSerivce'
import TitleDashboard from '@/components/titleDashboard'
import { ClientsService } from '@/services/ClientsServices'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import DashboardCampaign from '@/components/campaignDashboard'
import { CreatorsService } from '@/services/CreatorsService'
import { UserService } from '@/services/UsersService'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const getUser = await UserService.findPositionById(session!.user.id)

  const campaigns = await CampaignsService.findMany(session!.user.id)
  const clients = await ClientsService.findMany(session!.user.id)
  const creators = await CreatorsService.findMany(session!.user.id)
  const allPosts = await PostsService.findAllPosts()
  const totalViews = await PostsService.findViewsFromAllPosts()
  const totalReach = await PostsService.findReachFromAllPosts()
  const totalComments = await PostsService.findCommentsFromAllPosts()
  const engagementRate = await PostsService.findEngagementRateFromAllPosts()

  const stats = [
    {
      section: 'private',
      data: [
        { title: clients.length, description: 'clients' },
        { title: campaigns.length, description: 'campaigns' },
        { title: allPosts.length, description: 'posts' },
        // { title: engagementRate + '%', description: 'engagement rate' },
        // { title: totalViews, description: 'views' },
        // { title: totalReach, description: 'reach' },
        // { title: totalComments, description: 'comments' },
        { title: creators.length, description: 'creators' },
      ],
    },
    {
      section: 'public',
      data: [
        { title: creators.length, description: 'creators' },
        { title: campaigns.length, description: 'campaigns' },
        // { title: totalViews, description: 'views' },
        // { title: totalPlays, description: 'views' },
      ],
    },
  ]

  return (
    <div className='justify-left flex h-full w-full flex-col  gap-4 bg-white'>
      <TitleDashboard title={'welcome,'} user={session?.user!} />
      <DashboardCampaign
        campaignsFallback={campaigns}
        clientsFallback={clients}
      />
      <ClientCard clientsFallback={clients} campaignsFallback={campaigns} />
      <Stats
        campaignsFallback={campaigns}
        clientsFallback={clients}
        stats={stats}
        userPositionId={getUser}
        frome={'dashboard'}
      />
    </div>
  )
}
