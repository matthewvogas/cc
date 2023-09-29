import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Settings from './settings'
import { getServerSession } from 'next-auth'
import { PostsService } from '@/services/PostsSerivce'

export default async function page() {
  const session = await getServerSession(authOptions)

  const posts = await PostsService.findByUser(String(session?.user.id))

  return <Settings posts={posts} />
}
