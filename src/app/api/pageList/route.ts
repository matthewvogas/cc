import { authOptions } from '../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import db from '@/lib/db'
import S3Service from '@/lib/S3Service'
import InstagramService from '@/lib/InstagramService'
import { SocialConnectionService } from '@/services/SocialConnectionService'

export async function POST(req: NextRequest) {
  
  const session = await getServerSession(authOptions)
  const token = await SocialConnectionService.findInstagramToken(session!.user.id)

  interface InstagramBusinessAccount {
    username: string
    name: string
    profile_picture_url: string
    followers_count: number
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

  const instagramBusinessAccounts: InstagramBusinessAccount[] =
    jsonData.accounts.data.map(
      (accountData: any) => accountData.instagram_business_account,
    )

  for (const page of instagramBusinessAccounts) {

    const pages = await db.instagramPages.upsert({
      where: {
        id: page.id 
      },
      create: {
        id: page.id,
        userId: session!.user!.id,
        username: page.username,
        name: page.name,
        profile_picture_url: page.profile_picture_url,
        followers_count: String(page.followers_count),
        accountId: page.id,
        tokenId: ''
      },
      update: {
        userId: session?.user.id,
        username: page.username,
        name: page.name,
        profile_picture_url: page.profile_picture_url,
        followers_count: String(page.followers_count),
        accountId: page.id,
        tokenId: ''
      }
    })

    console.log('succes: ', page.id)
    
  }

  return NextResponse.json('ok')
}
