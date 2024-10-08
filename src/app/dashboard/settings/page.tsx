import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { PostsService } from '@/services/PostsSerivce'
import { InstagramPagesService } from '@/services/InstagramPagesService'
import Settings from './settings'
import { SocialConnectionService } from '@/services/SocialConnectionService'
import { UserService } from '@/services/UsersService'
import { TiktokPagesService } from '@/services/TiktokPagesService'
import { StoriesService } from '@/services/StoriesService'
import { PortfolioService } from '@/services/Portfolio'

export default async function Page() {
  const session = await getServerSession(authOptions)
  const fetchUser = async (userId: string) => {
    try {
      const response = await fetch(`https://codecoco.co/api/user/${userId}`)

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

  const tiktokToken = await SocialConnectionService.findTikTokToken(
    session!.user?.id,
  )

  const posts = await PostsService.findByUser(String(session?.user.id))
  const stories = await StoriesService.findByUser(session!.user?.id)

  const instagramPages = await InstagramPagesService.findByUserId(
    session!.user?.id,
  )
  const tiktokPages = await TiktokPagesService.findByUserId(session!.user?.id)

  const instagramConnection = await SocialConnectionService.findInstagram(
    String(session?.user.id),
  )

  const tiktokConnection = await SocialConnectionService.findTikTok(
    String(session?.user.id),
  )
  const portfolio = await PortfolioService.getData(
    String(session?.user.id),
  )

  console.log(portfolio)

  return (
    <Settings
      user={user}
      session={session}
      posts={posts}
      stories={stories}
      instagramPages={instagramPages}
      tiktokPages={tiktokPages}
      instgramToken={instgramToken}
      instagramConnection={instagramConnection}
      tiktokConnection={tiktokConnection}
      tiktokToken={tiktokToken}
      portfolio={portfolio}
    />
  )
}
