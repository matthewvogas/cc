import { NextRequest, NextResponse } from 'next/server'
import { render } from '@react-email/render'
import WelcomeEmail from '../../../../emails/creatorInvitation'
import EmailService from '@/lib/EmailService'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import db from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const to = searchParams.get('to')
  const session = await getServerSession(authOptions)

  if (!to)
    return NextResponse.json({ error: 'Missing recipent' }, { status: 400 })

  try {
    if (!session || !session.user || !session.user.id) {
      throw new Error('La sesión del usuario no está definida o no tiene ID.')
    }

    const res = await fetch('https://codecoco.co/api/connections/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: to,
        session: session.user.id
      }),
    })

    const welcomeEmail = await EmailService.sendEmail({
      subject: 'Welcome to Codecoco',
      to,
      html: render(
        WelcomeEmail({
          baseURL: process.env.NEXTAPP_URL!,
        }),
      ),
    })

    return NextResponse.json({ message: 'Email sent' })
  } catch (err: any) {
    console.log('Email Error', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
