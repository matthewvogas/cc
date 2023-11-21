import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const session = await getServerSession(authOptions)
    const campaignId = url.searchParams.get('campaign')

    const limitParam = url.searchParams.get('limit')
    const offsetParam = url.searchParams.get('offset')

    const limit = limitParam ? parseInt(limitParam, 10) : 10
    const offset = offsetParam ? parseInt(offsetParam, 10) : 0

    const posts = await db.post.findMany({
      where: { campaignId: +campaignId! },
      include: { creator: true },
      take: limit + 1,
      skip: offset,
    })

    const hasMore = posts.length > limit
    const resultPosts = hasMore ? posts.slice(0, -1) : posts

    return NextResponse.json({ posts: resultPosts, hasMore })
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
