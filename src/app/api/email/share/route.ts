import { NextRequest, NextResponse } from 'next/server'
import { render } from '@react-email/render'
import CampaignAcess from '../../../../../emails/campaignAccess'
import EmailService from '@/lib/EmailService'
import { PrismaClient } from '@prisma/client'

const crypto = require('crypto')
const db = new PrismaClient()

function generateUniqueToken() {
  const buffer = crypto.randomBytes(32)
  const token = buffer.toString('hex')
  return token
}

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url)
  const to = searchParams.get('to')
  const agency = searchParams.get('agency')
  const campaign = searchParams.get('campaign')
  if (!to)
    return NextResponse.json({ error: 'Missing recipent' }, { status: 400 })

  const token = await generateUniqueToken()

  const accessToken = await db.shareAccess.create({
    data: {
      email: to || '',
      token: token,
      used: false,
      type: 'CAMPAIGN'
    },
  })

  console.log(accessToken)

  try {
    const campaignAccessShare = await EmailService.sendEmail({
      subject: 'Codecoco Campaign Invitation',
      to,
      html: render(
        CampaignAcess({
          baseURL: process.env.NEXTAPP_URL!,
          agencyName: agency || '',
          campaign: campaign || '',
          token: token || '',
        }),
      ),
    })

    return NextResponse.json({ message: 'Email sent' })
  } catch (err: any) {
    console.log('Email Error', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
