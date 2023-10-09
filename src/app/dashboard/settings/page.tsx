import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { PostsService } from '@/services/PostsSerivce'
import { InstagramPagesService } from '@/services/InstagramPagesService'
import Settings from './settings'
import { SocialConnectionService } from '@/services/SocialConnectionService'
import { UserService } from '@/services/UsersService'

export default async function Page() {
  const session = await getServerSession(authOptions)
  const fetchUser = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/${userId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }

      const userData = await response.json()
      return userData
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }

  // Uso:
  const userId = String(session?.user.id)
  const user = await fetchUser(userId)

  const instgramToken = await SocialConnectionService.findInstagramToken(
    session!.user?.id,
  )
  const posts = await PostsService.findByUser(String(session?.user.id))
  const instagramPages = await InstagramPagesService.findByUserId(
    session!.user?.id,
  )
  const instagramConnection = await SocialConnectionService.findInstagram(
    String(session?.user.id),
  )

  return (
    <Settings
      user={user}
      session={session}
      posts={posts}
      instagramPages={instagramPages}
      instgramToken={instgramToken}
      instagramConnection={instagramConnection}
    />
  )
}
