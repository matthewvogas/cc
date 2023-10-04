import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { PostsService } from '@/services/PostsSerivce'
import { InstagramPagesService } from '@/services/InstagramPagesService'
import Settings from './settings'
import { SocialConnectionService } from '@/services/SocialConnectionService'

export default async function Page() {
  const session = await getServerSession(authOptions)
  const instgramToken = await SocialConnectionService.findInstagramToken(session!.user?.id)
  const posts = await PostsService.findByUser(String(session?.user.id))
  const instagramPages = await InstagramPagesService.findByUserId(
    session!.user?.id,
  )
  const InstagramConnection = await SocialConnectionService.findInstagramToken(
    String(session?.user.id),
  )

  return <Settings session={session} posts={posts} instagramPages={instagramPages} instgramToken={instgramToken} />
}
