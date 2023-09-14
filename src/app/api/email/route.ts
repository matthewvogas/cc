import { NextRequest, NextResponse } from 'next/server'
import { render } from '@react-email/render'
import WelcomeEmail from '../../../../emails/creatorInvitation'
import EmailService from '@/lib/EmailService'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const to = searchParams.get('to')
  if (!to)
    return NextResponse.json({ error: 'Missing recipent' }, { status: 400 })

  try {
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
