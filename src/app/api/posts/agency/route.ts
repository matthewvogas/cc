import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const session = await getServerSession(authOptions)

    if (!session)
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const campaignId = url.searchParams.get('campaignId')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const offset = parseInt(url.searchParams.get('offset') || '0')
    const activeSocial = url.searchParams.get('activeSocial')


    const posts = await db.post.findMany({
      where: {
        campaignId: +campaignId!,
        platform: activeSocial! == 'All' ? { in: ['instagram', 'tiktok'] } : activeSocial!,
      },
      include: {
        creator: true,
      },
      take: +limit,
      skip: +offset,
    })

    const hasMore = true

    const totalPosts = await db.post.count({
      where: {
        userId: session?.user.id,
        platform: activeSocial! == 'All' ? { in: ['instagram', 'tiktok'] } : activeSocial!,
        campaignId: parseInt(campaignId!)
      },
    })

    return NextResponse.json({ posts, hasMore, totalPosts })
  } catch (err) {
    console.log(err)
    return NextResponse.json(err, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const {
      uuid,
      campaignId,
      creatorId,
      caption,
      permalink,
      shortcode,
      platform,
    } = await req.json()

    const post = await db.post.create({
      data: {
        uuid: uuid,
        userId: session!.user.id,
        campaignId: campaignId,
        creatorId: creatorId,
        caption: caption,
        permalink: permalink,
        shortcode: shortcode,
        platform: platform,
      },
    })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      },
    )
  }
}
