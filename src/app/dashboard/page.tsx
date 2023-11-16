import CampaignCardIfluencer from '@/components/cards/influencer/campaignCardInfluencer'
import CampaignCard from '@/components/cards/agency/campaigns/campaignCard'
import AgenciesCard from '@/components/cards/agency/creators/agenciesCard'
import ClientCard from '@/components/cards/agency/clients/clientCard'
import PostCardTest from '@/components/cards/test/posts/postCard'
import TitleDashboard from '@/components/labels/titleDashboard'
import { CampaignsService } from '@/services/CampaignsService'
import StatsCreator from '@/components/stats/influencer/stats'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { CreatorsService } from '@/services/CreatorsService'
import { ClientsService } from '@/services/ClientsServices'
import { PostsService } from '@/services/PostsSerivce'
import { UserService } from '@/services/UsersService'
import Stats from '@/components/stats/agency/stats'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { ConnectionService } from '@/services/ConnectionService'
import { InstagramPagesService } from '@/services/InstagramPagesService'

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

  const campaignsWithCreator = await ConnectionService.findManyByUserIdFromCreator(String(session?.user.id))

  const connections = await ConnectionService.findManyByUserIdFromCreator(
    String(session?.user.id)
  )

  const instagramPages = await InstagramPagesService.findByUserId(
    String(session?.user.id),
  )

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
        // { title: creators.length, description: 'creators' },
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

  if (session?.user.role === 'AGENCY') {
    return (
      <div className='justify-left flex h-full w-full flex-col gap-4 bg-white'>
        <TitleDashboard title={'welcome,'} user={session?.user!} />
        <CampaignCard campaignsFallback={campaigns} clientsFallback={clients} />
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
  } else if (session?.user.role === 'CREATOR') {
    return (
      <div>
        <div className='justify-left flex h-full w-full flex-col  gap-4 bg-white'>
          <TitleDashboard title={'Welcome,'} user={session?.user!} />
          <CampaignCardIfluencer
            user={session?.user!}
            instagramPages={instagramPages}
            campaignsFallback={campaignsWithCreator}
            clientsFallback={clients}
          />
          <AgenciesCard
            agencies={connections}
            campaignsFallback={campaigns}
          />
        </div>
        <div className='bg-beigeFirst'>
          <StatsCreator
            campaignsFallback={campaignsWithCreator}
            agencies={connections}
            stats={stats}
            userPositionId={getUser}
            frome={'dashboard'}
          />
        </div>

        {/* <div>
          <div className='w-full mt-9 pt-8 mb-8 flex justify-between items-center px-12'>
            <h3
              className={`self-center text-[18px] leading-[1.75rem] font-semibold text-gray-800`}>
              a look at your top performing posts
            </h3>
            <div className={`flex items-center justify-between`}>
              <div className={`flex items-baseline`}>
                <Link
                  href={`/dashboard/g}`}
                  className={`items-center bg-transparent border border-black mx-2 px-9 py-3 rounded-full text-black text-lg`}>
                  view portafolio
                </Link>
                <Link
                  href={`/dashboard/g}`}
                  className={`items-center bg-transparent border border-black mx-2 px-9 py-3 rounded-full text-black text-lg`}>
                  share this view
                </Link>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className='mx-6 md:ml-12 justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
          {campaigns[0]?.posts?.map((post: any, index: any) => (
            <PostCardTest key={index} post={post} />
          ))}
        </div> */}
      </div>
    )
  } else if (session?.user.role === 'TESTER') {
    return (
      <div className='justify-left flex h-full w-full flex-col  gap-4 bg-white'>
        <TitleDashboard title={'Welcome,'} user={session?.user!} />
        <CampaignCard campaignsFallback={campaigns} clientsFallback={clients} />
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
}
