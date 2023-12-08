import { SocialConnectionService } from '@/services/SocialConnectionService'
import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: NextRequest) {
  const { userId } = await req.json()

  const token = await SocialConnectionService.findInstagramToken(userId)

  interface InstagramBusinessAccount {
    username: string | ''
    name: string | ''
    profile_picture_url: string
    followers_count: number | 0
    id: string
  }

  interface InstagramAccountData {
    instagram_business_account: InstagramBusinessAccount
  }

  interface InstagramAccountsResponse {
    accounts: {
      data: InstagramAccountData[]
    }
  }

  const jsonData = await fetch(
    `https://graph.facebook.com/v18.0/me/?fields=accounts{instagram_business_account{username,name,profile_picture_url,followers_count,id}}&access_token=${token}`,
  ).then(res => res.json())

  const validAccounts = jsonData.accounts.data.filter(
    (accountData: any) =>
      accountData &&
      accountData.instagram_business_account &&
      accountData.instagram_business_account.id,
  )

  const instagramBusinessAccounts: InstagramBusinessAccount[] =
    validAccounts.map(
      (accountData: any) => accountData.instagram_business_account,
    )

  for (const page of instagramBusinessAccounts) {

    const pageExist = await db.instagramPages.findFirst({
      where: {
        userId: userId,
        accountId: page.id,
      },
    })

    if (pageExist) {
      const pages = await db.instagramPages.upsert({
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
    } else {
      const pages = await db.instagramPages.create({
        data: {
          userId: userId,
          username: page.username,
          name: page?.name || '',
          profile_picture_url: page.profile_picture_url,
          followers_count: String(page.followers_count),
          accountId: page.id,
          tokenId: '',
        },
      })
    }

    console.log('Username', page.username)

    const creatorExist = await db.creator.findFirst({
      where: {
        username: page.username,
      },
    })

    console.log('Creador encontrado', creatorExist)
    
    if (creatorExist) {
      const updatePage = await db.creator.update({
        where: {
          id: creatorExist?.id,
        },
        data: {
          uuid: page.id,
          users: {
            connect: [{ id: userId }],
          },
        },
      })

      console.log('succes:', updatePage)
    }

    console.log('succes: ', page.id)
  }

  return NextResponse.json({ pages: instagramBusinessAccounts })
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
