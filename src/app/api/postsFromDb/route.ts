import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: 'asc',
    },
    take: 15,
  })
  return NextResponse.json(posts)
}
