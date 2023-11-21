import { NextRequest, NextResponse } from 'next/server'

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await db.user.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ 'User deleted': params.id })
  } catch (err: any) {
    return NextResponse.json(err.message, {
      status: 404,
    })
  }
}
