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
  const tokens = []
  const creatorsIds = []
  const InstagramPages = []

  async function updatePosts(instagramPage: string, instgramToken: string) {
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
        console.log(200)
      }
    } catch (error) {
      console.log(error)
    }
  }

  for (const post of CampaignPosts) {
    // if (post.creator?.username == page.username) {
    for (const connection of connections) {
      let connectionUserId2 = ''

      if (
        connection.user2.socialConnections &&
        connection.user2.socialConnections.length > 0 &&
        connection.user2.instagramPages &&
        connection.user2.instagramPages.length > 0
      ) {
        const socialConnection = connection.user2.socialConnections[0]
        userIds.push(socialConnection.userId)

        tokens.push(socialConnection.token)

        creatorsIds.push(socialConnection.userId)

        for (const page of connection.user2.instagramPages) {
          let data = { accountId: page.accountId, username: page.username }
          InstagramPages.push(data)
        }
      }
    }

    const InstagramPagesUniques = Array.from(new Set(InstagramPages))

    for (const page of InstagramPagesUniques) {
      if (post.creator?.username == page.username) {
        for (const token of tokens) {
          updatePosts(page.accountId, String(token))
        }
      } else {
        console.log('no macth')
      }
    }
  }

  return NextResponse.json({ 'pages:': 'done' })
}
