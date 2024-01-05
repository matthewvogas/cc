import { InstagramPagesService } from '@/services/InstagramPagesService'
import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { ConnectionService } from '@/services/ConnectionService'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { PostsService } from '@/services/PostsSerivce'

export async function POST(req: NextRequest) {
  const { sessionId, campaignId } = await req.json()

  const connections = await ConnectionService.findManyTokensByUserId(sessionId)
  const CampaignPosts = await PostsService.findMany(campaignId)

  const userIds = []
  const IgTokens = []
  const TtTokens = []
  const creatorsIds = []
  const InstagramPages = []
  const TiktokPages = []

  async function updateIgPosts(instagramPage: string, instgramToken: string) {
    try {
      const res = await fetch('http://localhost:3000/api/collect/instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instagramPage: instagramPage,
          instgramToken: instgramToken,
          sessionId: sessionId,
          postLimit: Infinity,
        }),
      })

      if (res.ok == true) {
      } else {
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function updatetTPosts(tiktokToken: string) {
    try {
      const res = await fetch('http://localhost:3000/api/collect/tiktokrefresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: sessionId,
          tiktokToken: tiktokToken,
        }),
      })

      if (res.ok == true) {

      } else {
      }
    } catch (error) {
      console.log(error)
    }
  }

  for (const post of CampaignPosts) {
    for (const connection of connections) {

      if (
        connection.user2.socialConnections &&
        connection.user2.socialConnections.length > 0 &&
        connection.user2.instagramPages &&
        connection.user2.instagramPages.length >= 0
      ) {
        const socialConnection = connection.user2.socialConnections.filter((connection: any) => connection.platform == 'INSTAGRAM')[0];

        userIds.push(socialConnection.userId)

        IgTokens.push(socialConnection.token)

        creatorsIds.push(socialConnection.userId)

        for (const page of connection.user2.instagramPages) {
          let data = { accountId: page.accountId, username: page.username }
          InstagramPages.push(data)
        }
      }

      if (
        connection.user2.socialConnections &&
        connection.user2.socialConnections.length > 0 &&
        connection.user2.tiktokPages &&
        connection.user2.tiktokPages.length >= 0
      ) {
        const socialConnection = connection.user2.socialConnections.filter((connection: any) => connection.platform == 'TIKTOK')[0];

        userIds.push(socialConnection.userId)

        TtTokens.push(socialConnection.token)

        creatorsIds.push(socialConnection.userId)

        for (const page of connection.user2.tiktokPages) {
          let data = { accountId: page.accountId, username: page.username }
          TiktokPages.push(data)
        }
      }

    }

    const InstagramPagesUniques = Array.from(new Set(InstagramPages))
    const TiktokPagesUniques = Array.from(new Set(TiktokPages))

    for (const page of InstagramPagesUniques) {
      if (post.creator?.username == page.username) {
        for (const token of IgTokens) {
          updateIgPosts(page.accountId, String(token))
        }
      } else {
        console.log('no match')
      }
    }
    
    for (const page of TiktokPagesUniques) {
      if (post.creator?.username == page.username) {
        for (const token of TtTokens) {
          updatetTPosts(String(token))
          console.log('match')
        }
      } else {
        console.log('no match')
      }
    }

  }
  return NextResponse.json('ok')
}
