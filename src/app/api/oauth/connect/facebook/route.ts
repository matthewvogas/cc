import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  const domain = process.env.NEXTAUTH_URL
  const FACEBOOK_GRAPH_VERSION = process.env.FACEBOOK_GRAPH_VERSION
  const redirectURL = `${domain}/api/oauth/connect/facebookcb`
  const client_id = process.env.FACEBOOK_CLIENT_ID
  const response_type = 'code'

  const FacebookAuthURL = `https://www.facebook.com/${FACEBOOK_GRAPH_VERSION}/dialog/oauth?client_id=${client_id}&scope=instagram_basic%2Cinstagram_manage_insights%2Cpages_show_list%2Cbusiness_management&response_type=${response_type}&redirect_uri=${redirectURL}`

  return NextResponse.redirect(FacebookAuthURL, { status: 302 })
}
