import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    const hashed = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashed,
      },
    })

    return NextResponse.json({
      user: {
        email: user.email,
        name: user.name,
      },
    })
  } catch (e: any) {
    return (
      NextResponse.json({
        error: 'XD',
      }),
      {
        status: 500,
      }
    )
  }
}
