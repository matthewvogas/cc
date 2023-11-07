import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  
  const scope = 'user.info.profile,user.info.stats,video.list'
  const response_type = 'code';
  const TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY
  const domain = process.env.NEXTAUTH_URL

  const redirect_uri = `${domain}/api/oauth/connect/rosalindcb/`;

  const tiktokAuthURL = `https://www.tiktok.com/v2/auth/authorize?client_key=${TIKTOK_CLIENT_KEY}&scope=${scope}&response_type=${response_type}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${id}`;

  return NextResponse.redirect(tiktokAuthURL, { status: 302 });
}
