import db from '@/lib/db'
import { signUpSchema } from '@/schemas/signUp.schema'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json()
    const result = signUpSchema.safeParse(body)

    if (!result.success) {
      const zodErrors = Object.fromEntries(
        result.error.issues.map(issue => [issue.path[0], issue.message]),
      )
      console.log(zodErrors)
      return NextResponse.json({ errors: zodErrors }, { status: 400 })
    }

    const { usernameOrEmail, password, name } = result.data
    const hashed = await hash(password, 12)

    const userExists = await db.user.findUnique({
      where: {
        email: usernameOrEmail,
      },
    })

    if (userExists) {
      return NextResponse.json(
        { errors: { usernameOrEmail: 'User already exists' } },
        { status: 400 },
      )
    }

    const user = await db.user.create({
      data: {
        email: usernameOrEmail,
        name,
        password: hashed,
      },
    })

    return NextResponse.json({
      message: 'User created',
      user: {
        name: user.name,
        email: user.email,
      },
    })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
