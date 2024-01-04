import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const session = await getServerSession(authOptions)

    const campaignId = url.searchParams.get('campaignId')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const offset = parseInt(url.searchParams.get('offset') || '0')
    const tags = url.searchParams.get('tags')
    const creators = url.searchParams.get('creators')
    const activeSocial = url.searchParams.get('activeSocial')
    const order = url.searchParams.get('order')
    const performance = url.searchParams.get('performance')

    let clause: any = {
      platform: activeSocial! == 'All' ? { in: ['instagram', 'tiktok'] } : activeSocial!,
      campaignId: parseInt(campaignId!),
    }

    if (creators) {
      const creatorIds = creators.split(',').map(id => parseInt(id))
      clause = {
        ...clause,
        creatorId: {
          in: creatorIds,
        },
      }
    }

    if (tags) {
      tags?.split(',').map(tag => {
        clause = {
          ...clause,
          caption: {
            contains: tag,
          },
        }
      })
    }

    if (performance == 'true') {
      clause = {
        ...clause,
        likesCount: { not: null },
        impressionsCount: { not: null },
        sharesCount: { not: null }
      }
    }

    let mainOrder = {}
    if (order == 'createdAt') mainOrder = { orderBy: { createdAt: 'desc' } }
    if (order == 'impressionsCount') {
      mainOrder = { orderBy: { impressionsCount: 'desc' } }
      clause = {
        ...clause,
        impressionsCount: { not: null }
      }
    }

    const posts = await db.post.findMany({
      where: {
        ...clause,
      },
      include: {
        creator: true,
        hashtags: true,
      },
      take: +limit,
      skip: +offset,
      ...mainOrder
    })
    const hasMore = true

    const totalPosts = await db.post.count({
      where: { ...clause },
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
