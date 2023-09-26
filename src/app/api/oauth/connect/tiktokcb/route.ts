import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {

  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  
  const tiktokResponse = await fetch(`https://open.tiktokapis.com/v2/oauth/token/`, {
    method: 'POST',
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY!,
      client_secret:process.env.TIKTOK_CLIENT_SECRET!,
      code: code!,
      grant_type: 'authorization_code',
      redirect_uri: 'https://dev.codecoco.co/api/oauth/connect/tiktokcb/',
    }),
  }).then(res => res.json())

  console.log(tiktokResponse)

  return NextResponse.json(tiktokResponse)
}
