import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import db from '@/lib/db'

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url)
  let code = searchParams.get('code')
  const id = searchParams.get('state')

  const INSTAGRAM_CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID
  const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET
  const domain = process.env.NEXTAUTH_URL
  const redirect_uri = `${domain}/api/oauth/connect/rosalindcb`

  code = code!.replace('#_', '')

  let userId = ''
  const session = await getServerSession(authOptions)

  userId = String(id)

  const params = new URLSearchParams()

  params.append('client_id', INSTAGRAM_CLIENT_ID!)
  params.append('client_secret', INSTAGRAM_CLIENT_SECRET!)
  params.append('grant_type', 'authorization_code')
  params.append('redirect_uri', redirect_uri)
  params.append('code', code) // 'code' is already sanitized to remove '#_'

  const instagramResponse = await fetch(
    'https://api.instagram.com/oauth/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    },
  ).then(res => res.json())

  const longLive = await fetch(
    `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${INSTAGRAM_CLIENT_SECRET}&access_token=${instagramResponse.access_token}`,
  ).then(res => res.json())

  const longToken = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${longLive.access_token}`,
  ).then(res => res.json())

  const user = await fetch(
    `https://graph.instagram.com/v18.0/me?fields=username&access_token=${longToken.access_token}`,
  ).then(res => res.json())

  const succes = `https://withrosalind.com/network?username=${user.username}`

  try {
    const newSocialConnection = await db.socialConnection.create({
      data: {
        userId: userId,
        platform: 'INSTAGRAM',
        token: longToken.access_token,
        refreshToken: null,
        longToken: null,
      },
    })

    try {
      const res = await fetch(`${domain}/api/pageList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        console.log('Data received:', data)
      } else {
        console.log('Error status:', res.status)
      }
    } catch (error) {
      console.error('Fetch error:', error)
    }

    console.log('Succes:', newSocialConnection)
  } catch (error) {
    console.error('Error:', error)
  }

  return NextResponse.redirect(succes, { status: 302 })
}
