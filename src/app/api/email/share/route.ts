import { NextRequest, NextResponse } from 'next/server'
import { render } from '@react-email/render'
import CampaignAcess from '../../../../../emails/campaignAccess'
import EmailService from '@/lib/EmailService'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses')
import { authOptions } from '../../auth/[...nextauth]/route'

const crypto = require('crypto')
const db = new PrismaClient()

function generateUniqueToken() {
  const buffer = crypto.randomBytes(32)
  const token = buffer.toString('hex')
  return token
}

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
  const agency = searchParams.get('agency')
  const campaign = searchParams.get('campaign')

  const session = await getServerSession(authOptions)

  if (!to)
    return NextResponse.json({ error: 'Missing recipent' }, { status: 400 })

  const token = await generateUniqueToken()

  const shareAccess = await db.accessCampaign.create({
    data: {
      email: to || '',
      accessType: 'WRITE',
      userId: session?.user.id,
      CampaignId: Number(campaign),
    },
  })

  console.log(shareAccess)

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Data: render(
            CampaignAcess({
              baseURL: process.env.NEXTAPP_URL!,
              agencyName: agency || '',
              campaign: campaign || '',
              token: token || '',
            }),
          ),
        },
      },
      Subject: {
        Data: 'Codecoco Campaign Invitation',
      },
    },
    Source: 'hello@codecoco.co',
  }

  try {

    const sendEmailCommand = new SendEmailCommand(params)

    ses.send(sendEmailCommand).then(
      (data: any) => console.log('Email sent:', data),
      (error: any) => console.error(error),
    )
    return NextResponse.json({ message: 'Email sent' })
  } catch (err: any) {
    console.log('Email Error', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
