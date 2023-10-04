import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {

  const FACEBOOK_GRAPH_VERSION = process.env.FACEBOOK_GRAPH_VERSION
  const redirectURL = 'https://dev.codecoco.co/api/oauth/connect/facebookcb/'
  const client_id = process.env.FACEBOOK_CLIENT_ID;
  const response_type = 'code';

  const FacebookAuthURL = `https://www.facebook.com/${FACEBOOK_GRAPH_VERSION}/dialog/oauth?client_id=${client_id}&scope=instagram_basic,instagram_manage_insights,pages_show_list,business_management&response_type=${response_type}&redirect_uri=${redirectURL}`

  return NextResponse.redirect(FacebookAuthURL, { status: 302 });
}
