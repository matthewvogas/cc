import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import { CreatorsService } from '@/services/CreatorsService'
import { StoriesService } from '@/services/StoriesService'
import { CampaignRes } from '@/types/campaign/campaignRes'
import TitlePage from '@/components/labels/titlePage'
import { PostsService } from '@/services/PostsSerivce'
import { getServerSession } from 'next-auth'
import SocialData from './Data'
import { Session } from 'inspector'
import { parse } from 'path'

export const dynamic = 'force-dynamic'

export default async function DataPage() {
  const session = await getServerSession(authOptions)

  const posts = await PostsService.findByUser('clmrtf9kg0000pv7ezolc31zb')

  return (
    <div className='overflow-clip'>
      <SocialData posts={posts} />
    </div>
  )
}
