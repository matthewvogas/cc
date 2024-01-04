import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import { CreatorsService } from '@/services/CreatorsService'
import CampaingsTabs from '@/components/tabs/CampaingTabs'
import { StoriesService } from '@/services/StoriesService'
import { CampaignRes } from '@/types/campaign/campaignRes'
import TitlePage from '@/components/labels/titlePage'
import { PostsService } from '@/services/PostsSerivce'
import { getServerSession } from 'next-auth'
import { ClientsService } from '@/services/ClientsServices'
import { ConnectionService } from '@/services/ConnectionService'
import { AccessCampaignService } from '@/services/AccessCampaignService'
import Image from 'next/image'
import Link from 'next/link'
import coverImageClient from 'public/assets/uniqueClient/clientCoverPage.jpg'
import PortfoliosTabs from '@/components/tabs/PortfolioTabs'

export const dynamic = 'force-dynamic'

export default async function CampaignPage({
  params,
}: {
  params: { id: number }
}) {
  const { id } = params
  try {
    const campaign = (await CampaignsService.findUnique(id)) as CampaignRes
    const creators = await CreatorsService.findByCampaignId(id)
    const posts = await PostsService.findMany(id)
    const stories = await StoriesService.findByCampaign(id)
    const session = await getServerSession(authOptions)
    const client = await ClientsService.findUnique(params.id)
    const connections = await ConnectionService.findManyByUserId(
      session!.user.id,
    )
    const access = await AccessCampaignService.findAcessToCampaign(id)

    return (
      <div className='overflow-clip'>
        <div>
          {session?.user.role == 'CREATOR' ? (
            <>
              <div className='w-full'>
                <div className='relative'>
                  <Image
                    className='w-full -mb-24 max-h-44 object-cover'
                    src={coverImageClient}
                    alt=''
                    width={1660}
                    height={160}
                  />
                </div>
                <div className='mx-auto  h-full w-full justify-between px-12'>
                  <div className='w-full'>
                    <div
                      className={`flex items-center justify-between relative z-50`}>
                      <h2 className={`text-2xl text-white`}>
                        {campaign?.name} 🥥
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <TitlePage
                title={String(campaign?.name)}
                moduleText={'singleCampaign'}
                client={campaign?.client}
                clientsFallback={null}
                campaignsFallback={null}
                setSort={null}
              />
              <div className='divider' />
            </>
          )}
        </div>
        {session?.user.role == 'CREATOR' ? (
          <>
            <PortfoliosTabs
              campaign={campaign}
              creators={creators}
              posts={posts}
              stories={stories}
              session={session}
              client={client}
              connections={connections}
              access={access}
            />
          </>
        ) : (
          <>
            <CampaingsTabs
              campaign={campaign}
              creators={creators}
              posts={posts}
              stories={stories}
              session={session}
              client={client}
              connections={connections}
              access={access}
              shared={false}
            />
          </>
        )}
      </div>
    )
  } catch (err: any) {
    return <div className='text-center'>404 {err.message}</div>
  }
}
