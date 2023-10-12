import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { ClientsService } from '@/services/ClientsServices'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    const clients = await ClientsService.findMany(session!.user.id)
    return NextResponse.json(clients)
  } catch (err) {
    console.log(err)
    return NextResponse.json(err, {
      status: 500,
    })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    const { name, email, tags } = await req.json()

    const existingTags = await db.tag.findMany({
      where: {
        name: {
          in: tags,
        },
      },
    })

    const existingTagNames = existingTags.map(tag => tag.name)
    const newTags = tags.filter(
      (tag: string) => !existingTagNames.includes(tag),
    )
    await db.tag.createMany({
      data: newTags.map((tag: any) => ({ name: tag })),
    })

    const client = await db.client.create({
      data: {
        userId: session!.user.id,
        name,
        email,
        tags: {
          connect: tags.map((tag: any) => ({ name: tag })),
        },
      },
    })

    return NextResponse.json({ success: true })
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
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)

  try {
    await db.client.deleteMany({
      where: {
        userId: session?.user.id,
      },
    })

    return NextResponse.json({ success: 'All clients deleted' })
  } catch (err: any) {
    console.error('Error deleting all clients:', err)
    return NextResponse.json(
      { error: 'An error occurred while deleting all clients' },
      {
        status: 500,
      },
    )
  }
}