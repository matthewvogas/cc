import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  const domain = process.env.NEXTAUTH_URL
  const client_id = process.env.INSTAGRAM_CLIENT_ID
  const response_type = 'code'
  
  const redirect_uri = `${domain}/api/oauth/connect/rosalindcb`;

  const InstagramAuthURL = `https://api.instagram.com/oauth/authorize?client_id=${client_id}&scope=user_profile&response_type=${response_type}&redirect_uri=${redirect_uri}`;
  
  return NextResponse.redirect(InstagramAuthURL, { status: 302 })
}
