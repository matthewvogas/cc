import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import db from '@/lib/db'

export async function GET(req: NextRequest, res: NextResponse) {
  // callback and longToken from FB
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID
  const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET
  const redirect_uri = 'https://dev.codecoco.co/api/oauth/connect/facebookcb' 

  const facebookResponse = await fetch(
    `https://graph.facebook.com/v17.0/oauth/access_token?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${redirect_uri}&client_secret=${FACEBOOK_CLIENT_SECRET}&code=${code}`,
  ).then(res => res.json())

  const longToken = await fetch(
    `https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${FACEBOOK_CLIENT_ID}&client_secret=${FACEBOOK_CLIENT_SECRET}&fb_exchange_token=${facebookResponse.access_token}`,
  ).then(res => res.json())

  const succes = 'https://dev.codecoco.co/'

  const session = await getServerSession(authOptions)

  try {
    const userId = session?.user.id
    if (!userId) {
      throw new Error('Where is the ID?')
    }

    const newSocialConnection = await db.socialConnection.create({
      data: {
        userId: userId,
        platform: 'INSTAGRAM',
        token: longToken.access_token,
        refreshToken: null,
        longToken: null,
      },
    })

    console.log('Succes:', newSocialConnection)
  } catch (error) {
    console.error('Error:', error)
  }

  return NextResponse.redirect(succes, { status: 302 })
}
