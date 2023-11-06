import { InstagramPagesService } from '@/services/InstagramPagesService'
import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: NextRequest) {
  const { sessionId, tiktokPage, tiktokToken } = await req.json()

  // FOR TIKTOK

  return NextResponse.json('ok')
}
