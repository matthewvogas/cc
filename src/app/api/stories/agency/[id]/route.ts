import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await db.story.delete({
      where: {
        id: +params.id,
      },
    })

    return NextResponse.json({ success: 'Post deleted' })
  } catch (err: any) {
    return NextResponse.json(err.message, {
      status: 404,
    })
  }
}
