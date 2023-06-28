import db from '@/lib/db'
import { NextResponse } from 'next/server'

const hashtagSearch = async (hashtag: string) => {
  const existsInDb = await db.hashtag.findUnique({ where: { name: hashtag } })
  if (!existsInDb) {
    const url: URL = new URL(
      `https://graph.facebook.com/v16.0/ig_hashtag_search`,
    )
    url.searchParams.append('user_id', '17841447832021774')
    url.searchParams.append('q', hashtag)
    url.searchParams.append(
      'access_token',
      'EAAR5U6jL0JcBAFG9unBeqjKdZBVCaBs2veaRw4dChUYZCweyVV47c1J96F5ZAVZCywvpaeVBaNhXpXwN1CpBH74GW1BoLhpX2kRuxht5uSmVj7u9wJ6mLtAdlprBxGNXf16elTuo7VPfM9ZCd1BJHJ3EwGcLmacgwumCa2ZCZAILZAV4O98Y6Eu9',
    )
    const res = await fetch(url).then(res => res.json())
    const { id } = res.data[0]
    if (!id) return null

    await db.hashtag.create({ data: { name: hashtag, igId: id } })
    return id
  } else {
    return existsInDb.igId
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const hashtag = searchParams.get('q')
    if (!hashtag) throw new Error('Hashtag is required')
    const igId = await hashtagSearch(hashtag)
    if (!igId) throw new Error('Hashtag not found')

    const url: URL = new URL(`https://graph.facebook.com/v16.0/${igId}/top_media`)
    url.searchParams.append('user_id', '17841447832021774')
    url.searchParams.append('fields', 'id,caption,media_type,comments_count,like_count,media_url,permalink')
    url.searchParams.append(
      'access_token',
      'EAAR5U6jL0JcBAFG9unBeqjKdZBVCaBs2veaRw4dChUYZCweyVV47c1J96F5ZAVZCywvpaeVBaNhXpXwN1CpBH74GW1BoLhpX2kRuxht5uSmVj7u9wJ6mLtAdlprBxGNXf16elTuo7VPfM9ZCd1BJHJ3EwGcLmacgwumCa2ZCZAILZAV4O98Y6Eu9',
    )

    const res = await fetch(url).then(res => res.json())
    return NextResponse.json(res)

  } catch (e: any) {
    return NextResponse.json({ message: e.message })
  }
}
