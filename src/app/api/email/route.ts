import { NextRequest, NextResponse } from 'next/server'
import { render } from '@react-email/render'
import WelcomeEmail from '../../../../emails/creatorInvitation'
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses')
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import db from '@/lib/db'

const ses = new SESClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_SES,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_SES,
  },
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const to = searchParams.get('to')
  const session = await getServerSession(authOptions)

  const params = {
    Destination: {
      ToAddresses: [
      to
      ],
    },
    Message: {
      Body: {
        Html: {
          Data: render(
            WelcomeEmail({
              baseURL: process.env.NEXTAPP_URL!,
            })
          ),
        },
      },
      Subject: {
        Data: 'Welcome to Codecoco',
      },
    },
    Source: 'hello@codecoco.co',
  };
  
  const sendEmailCommand = new SendEmailCommand(params)

  ses.send(sendEmailCommand).then(
    (data: any) => console.log('Email sent:', data),
    (error: any) => console.error(error),
  )

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
        session: session.user.id,
      }),
    })

    return NextResponse.json({ message: 'Email sent' })
  } catch (err: any) {
    console.log('Email Error', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
