import { SocialConnectionService } from '@/services/SocialConnectionService'
import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: NextRequest) {

  const { userId } = await req.json()

  const token = await SocialConnectionService.findTikTokToken(userId)

    async function getUserInfo(accessToken: any): Promise<any> {
      const url =
        'https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name,username,bio_description,profile_deep_link,is_verified,follower_count,video_count,likes_count'
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch user info: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    }

  const response = await getUserInfo(token)
  const page = response.data.user;

  const TikTokPage = await db.tiktokPages.upsert({
    where: {
      id: page.open_id,
    },
    create: {
      id: page.open_id,
      userId: userId,
      username: page.username,
      name: page?.username || '',
      profile_picture_url: page.avatar_url,
      followers_count: String(page.follower_count),
      accountId: page.open_id,
      tokenId: '',
    },
    update: {
      userId: userId,
      username: page.username,
      name: page?.username || '',
      profile_picture_url: page.avatar_url,
      followers_count: String(page.follower_count),
      accountId: page.open_id,
      tokenId: '',
    },
  })

  return NextResponse.json({ pages: TikTokPage })
}

export async function DELETE(req: NextRequest) {
  const { userId } = await req.json()

  const pages = await db.tiktokPages.findMany({
    where: {
      userId: userId,
    },
  })

  for (let page of pages) {
    await db.tiktokPages.delete({
      where: {
        id: page.id,
      },
    })
  }

  return NextResponse.json({ SUCCES: pages })
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  const pages = await db.tiktokPages.findMany({
    where: {
      userId: String(id),
    },
  })

  const usernames = []
  for (let page of pages) {
    await db.tiktokPages.findFirst({
      where: {
        id: page.id,
      },
    })

    usernames.push(page.username)
  }

  return NextResponse.json({ usernames })
}
