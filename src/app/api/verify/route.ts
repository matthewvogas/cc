import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

async function verifyToken(token: string) {
  try {
    const tokenRecord = await db.shareAccess.findUnique({
      where: { token },
    })

    if (!tokenRecord || tokenRecord.used) {
      throw new Error('invalid token or expired')
    }

    await db.shareAccess.update({
      where: { token },
      data: { used: true },
    })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const domain = process.env.NEXTAUTH_URL
  const url = new URL(req.url)

  const token = url.searchParams.get('token') || ''
  const accessType = url.searchParams.get('type') || ''
  const errorUrl = '' // crear url de error

  if (accessType == '') {
    return NextResponse.redirect(errorUrl, { status: 302 })
  }

  const isValid = await verifyToken(token)

  if (isValid) {
    switch (accessType) {
        case 'campaign':
            const campaign = `${domain}`
            return NextResponse.redirect(campaign, { status: 302 })
        case 'post':
            const post = `${domain}`
            return NextResponse.redirect(post, { status: 302 })
        default:
            break;
    }
     
  }


}
