import { SocialConnectionService } from '@/services/SocialConnectionService'
import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: NextRequest) {
  const { userId } = await req.json()

  const token = await SocialConnectionService.findTikTokToken(userId)

  interface TiktokBusinessAccount {
    username: string | ''
    name: string | ''
    profile_picture_url: string
    followers_count: number | 0
    id: string
  }

  async function getUserInfo(accessToken: any): Promise<any> {
    const url =
      'https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name,username,follower_count'
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

  const page = await getUserInfo(token)

  return NextResponse.json({ pages: page })


  const TikTokPage = await db.instagramPages.upsert({
    where: {
      id: page.id,
    },
    create: {
      id: page.id,
      userId: userId,
      username: page.username,
      name: page?.name || '',
      profile_picture_url: page.profile_picture_url,
      followers_count: String(page.followers_count),
      accountId: page.id,
      tokenId: '',
    },
    update: {
      userId: userId,
      username: page.username,
      name: page?.name || '',
      profile_picture_url: page.profile_picture_url,
      followers_count: String(page.followers_count),
      accountId: page.id,
      tokenId: '',
    },
  })

  return NextResponse.json({ pages: 'instagramBusinessAccounts' })
}

export async function DELETE(req: NextRequest) {
  const { userId } = await req.json()

  const pages = await db.instagramPages.findMany({
    where: {
      userId: userId,
    },
  })

  for (let page of pages) {
    await db.instagramPages.delete({
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

  const pages = await db.instagramPages.findMany({
    where: {
      userId: String(id),
    },
  })

  const usernames = []
  for (let page of pages) {
    await db.instagramPages.findFirst({
      where: {
        id: page.id,
      },
    })

    usernames.push(page.username)
  }

  return NextResponse.json({ usernames })
}
