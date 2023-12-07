import db from '@/lib/db'
import { CreatorsByCampaignRes } from '@/types/creators/CreatorsByCampaignRes'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import { CreatorsService } from '@/services/CreatorsService'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { PostsService } from '@/services/PostsSerivce'
import { getServerSession } from 'next-auth'
import { SharedForm } from './sharedForm'
import { UserService } from '@/services/UsersService'

export default async function shareInvite({
  params,
}: {
  params: { username: string }
}) {
  const { username } = params

  const email = await username.replace('%40', '@')

  const user = await UserService.findUniqueByEmail(email)

  return <div>{user ? <SharedForm user={user}/> : <p className='w-screen h-screen flex justify-center items-center'>Not found 404</p>}</div>
}
