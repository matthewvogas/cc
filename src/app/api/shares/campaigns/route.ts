import { authOptions } from '../../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import S3Service from '@/lib/S3Service'
import sharp from 'sharp'
import db from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  const url = new URL(req.url)
  const campaignId = url.searchParams.get('campaign')

  if (!campaignId) return NextResponse.json({ 'not found': 404 })

  const campaigns = await db.accessCampaign.findMany({
    where: {
      CampaignId: parseInt(campaignId),
    },
  })

  const campaignURL = 'https://codecoco.co/campaign/' + campaignId

  campaigns.forEach(campaign => {
    if (campaign.email == session?.user.email) {
      return NextResponse.redirect(campaignURL, { status: 302 })
    } else {
      return NextResponse.json({ 'access denied': 403 })
    }
  })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const domain = process.env.NEXTAUTH_URL

  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const { emails, campaignId } = await req.json()

    for (const email of emails) {
      const userExist = await db.user.findFirst({
        where: {
          email: email,
        },
      })
      const accessExist = await db.accessCampaign.findFirst({
        where: {
          email: email,
        },
      })

      if (userExist) {
        if (accessExist) {
          const accessToSave = await db.accessCampaign.upsert({
            where: {
              id: accessExist.id,
            },
            create: {
              accessType: 'READ',
              campaign: campaignId,
              email: email,
            },
            update: {
              accessType: 'READ',
              campaign: campaignId,
              email: email,
              userId: session.user.id,
            },
          })
        } else {
          const accessToSave = await db.accessCampaign.create({
            data: {
              accessType: 'READ',
              CampaignId: campaignId,
              email: email,
              userId: session.user.id,
            },
          })
        }
      } else {
        try {
          let encodedEmail = encodeURIComponent(email)
          let encodedCampaignId = encodeURIComponent(campaignId)
          let encodedAgency = encodeURIComponent(session.user.name!)

          const response = await fetch(
            `${domain}/api/email/share?to=${encodedEmail}&campaign=${encodedCampaignId}&agency=${encodedAgency}`,
            {
              method: 'GET',
            },
          )

          if (response.ok) {
            const data = await response.json()
          } else {
            console.error('Error en la solicitud:', response.statusText)
          }
        } catch (error) {
          console.error('Error en la solicitud:', error)
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
