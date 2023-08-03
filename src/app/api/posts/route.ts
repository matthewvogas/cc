import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const session = await getServerSession(authOptions)
    const campaignId = url.searchParams.get('campaign')
    const posts = await db.post.findMany({
      where: {
        campaignId: +campaignId!,
      },
      include: {
        creator: true,
      },
    })

    // if (!session)
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    return NextResponse.json(posts)
  } catch (err) {
    console.log(err)
    return NextResponse.json(err, {
      status: 500,
    })
  }
}
