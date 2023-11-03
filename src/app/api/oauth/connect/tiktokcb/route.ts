import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import db from '@/lib/db'

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const domain = process.env.NEXTAUTH_URL

  let userId = ''
  const session = await getServerSession(authOptions)

  userId = session!.user.id
  const tiktokResponse = await fetch(
    `https://open.tiktokapis.com/v2/oauth/token/`,
    {
      method: 'POST',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_key: process.env.TIKTOK_CLIENT_KEY!,
        client_secret: process.env.TIKTOK_CLIENT_SECRET!,
        code: code!,
        grant_type: 'authorization_code',
        redirect_uri: `${domain}/api/oauth/connect/tiktokcb/`,
      }),
    },
  ).then(res => res.json())

  const succes = `${domain}/dashboard/settings/`

  try {
    const newSocialConnection = await db.socialConnection.create({
      data: {
        userId: userId,
        platform: 'TIKTOK',
        token: tiktokResponse.access_token,
        refreshToken: null,
        longToken: null,
      },
    })

    try {
      const res = await fetch(`${domain}/api/oauth/connect/tiktokPages`, {
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
