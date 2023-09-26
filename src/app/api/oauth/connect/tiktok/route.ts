import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {

  const scope = 'user.info.profile,user.info.stats,video.list'
  const response_type = 'code';
  const TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY
  const redirectURL = 'https://dev.codecoco.co/api/oauth/connect/tiktokcb/'

  const tiktokAuthURL = `https://www.tiktok.com/v2/auth/authorize?client_key=${TIKTOK_CLIENT_KEY}&scope=${scope}&response_type=${response_type}&redirect_uri=${redirectURL}`;

  return NextResponse.redirect(tiktokAuthURL, { status: 302 });
}
