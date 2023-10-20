// Ubicado en pages/api/create-user.ts

import { NextRequest, NextResponse } from 'next/server'
import {signIn as serverSignIn  } from 'next-auth/react'

import { hash } from 'bcrypt'
import db from '@/lib/db'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const email = url.searchParams.get('email') || undefined

  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    })

    return NextResponse.json({ user, status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 })
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password, name, role } = await req.json()

  if (!email || !password || !name || !role) {
    return NextResponse.json({ message: 'Method Not Allowed', status: 405 })
  }

  const hashedPassword = await hash(password, 10)

  try {
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    })


    return NextResponse.json({ user, status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal Server Error', status: 500 })
  }
}
