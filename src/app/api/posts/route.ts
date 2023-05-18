import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: 'asc',
    },
  })
  return NextResponse.json(posts)
}
