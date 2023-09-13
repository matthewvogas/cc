import CampaignCard from '@/components/cards/agency/campaigns/campaignCard'
import { CampaignsService } from '@/services/CampaignsService'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { CreatorsService } from '@/services/CreatorsService'
import { ClientsService } from '@/services/ClientsServices'
import TitleDashboard from '@/components/labels/titleDashboard'
import { PostsService } from '@/services/PostsSerivce'
import { UserService } from '@/services/UsersService'
import ClientCard from '@/components/cards/agency/clients/clientCard'
import { getServerSession } from 'next-auth'
import Stats from '@/components/stats/stats'
import CampaignCardIfluencer from '@/components/cards/influencer/campaignCardInfluencer'
import AgenciesCard from '@/components/cards/agency/creators/agenciesCard'


export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const getUser = await UserService.findPositionById(session!.user.id)

  const campaigns = await CampaignsService.findMany(session!.user.id)
  const clients = await ClientsService.findMany(session!.user.id)
  const creators = await CreatorsService.findMany(session!.user.id)
  const allPosts = await PostsService.findAllPostsFromUser(session!.user.id)
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

  if(session?.user.role === 'AGENCY'){
    return (
      <div className='justify-left flex h-full w-full flex-col gap-4 bg-white'>
        <TitleDashboard title={'welcome,'} user={session?.user!} />
        <CampaignCard
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
  } else if (session?.user.role === 'CREATOR'){
    return (
      <div >
        <div className='justify-left flex h-full w-full flex-col  gap-4 bg-white'>
        <TitleDashboard title={'Welcome,'} user={session?.user!} />
        <CampaignCardIfluencer
          campaignsFallback={campaigns}
          clientsFallback={clients}
        />
        <AgenciesCard clientsFallback={clients} campaignsFallback={campaigns} />  
        </div>
        <div className='bg-beigeFirst'>
          <Stats
            campaignsFallback={campaigns}
            clientsFallback={clients}
            stats={stats}
            userPositionId={getUser}
            frome={'dashboard'}
          />
        </div>
      </div>


    )
  }}
