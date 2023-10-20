import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get('id') || undefined

    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        instagramPages: true,
      },
    })

    const usernames: string[] = []

    for (const socialItem of user!.instagramPages) { 
      const username = socialItem.username
      usernames.push(username)
    }
    
    return NextResponse.json({ social: usernames, status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 })
  }
}
