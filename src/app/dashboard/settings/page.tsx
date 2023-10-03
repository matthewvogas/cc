import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { PostsService } from '@/services/PostsSerivce'
import { InstagramPagesService } from '@/services/InstagramPagesService'
import Settings from './settings'

export default async function Page() {
  
  const session = await getServerSession(authOptions)

  const posts = await PostsService.findByUser(String(session?.user.id))
  const instagramPages = await InstagramPagesService.findByUserId(session!.user?.id)

  return <Settings posts={posts} instagramPages={instagramPages} />
}
