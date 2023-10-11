import { NextRequest, NextResponse } from 'next/server'
import { useParams } from 'next/navigation'
import { db } from '@/lib/db'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return NextResponse.json(params.id)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { name, email } = await req.json()

  const handleUpdate = await db.user.update({
    where: {
      id: params.id,
    },
    data: {
      name: name,
      email: email,
    },
  })

  return NextResponse.json(handleUpdate)
}
