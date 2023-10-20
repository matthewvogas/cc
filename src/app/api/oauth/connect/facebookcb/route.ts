import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import db from '@/lib/db'

export async function GET(req: NextRequest, res: NextResponse) {
  // callback and longToken from FB
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const id = searchParams.get('id')

  const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID
  const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET
  const domain = process.env.NEXTAUTH_URL
  const redirect_uri = `${domain}/api/oauth/connect/facebookcb?id=${id}`

  let userId = ''
  const session = await getServerSession(authOptions)


  if (session?.user.id == null || undefined && id != null || "" || undefined) {
    userId = String(id)
  } else {
    userId = session!.user.id
  }

  
  const facebookResponse = await fetch(
    `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${redirect_uri}&client_secret=${FACEBOOK_CLIENT_SECRET}&code=${code}`,
  ).then(res => res.json())

  const longToken = await fetch(
    `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${FACEBOOK_CLIENT_ID}&client_secret=${FACEBOOK_CLIENT_SECRET}&fb_exchange_token=${facebookResponse.access_token}`,
  ).then(res => res.json())

  const succes = `${domain}/dashboard/settings/`

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
      const res = await fetch('http://localhost:3000/api/pageList', {
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
