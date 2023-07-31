import { sendEmail } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'
import { render } from '@react-email/render'
import WelcomeEmail from '../../../../emails/WelcomeTemplate'

export async function GET(req: NextRequest) {
  await sendEmail({
    to: 'dewin.umana@golabstech.com',
    subject: 'Welcome to NextAPI',
    html: render(WelcomeEmail()),
  })
  return NextResponse.json({ success: true })
}
