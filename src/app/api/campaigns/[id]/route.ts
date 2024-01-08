import { getServerSession } from 'next-auth/next'
import { NextResponse, NextRequest } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import db from '@/lib/db'

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const campaign = await CampaignsService.findUnique(+params.id)
    return NextResponse.json(campaign)
  } catch (err: any) {
    return NextResponse.json(err.message, {
      status: 404,
    })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await db.campaign.delete({
      where: {
        id: +params.id,
      },
    })

    return NextResponse.json({ success: 'Campaign deleted' })
  } catch (err: any) {
    return NextResponse.json(err.message, {
      status: 404,
    })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { name, description } = await req.json()

  try {
    if (!name || !description) {
      return NextResponse.json(
        { error: 'Incomplete fields' },
        {
          status: 400,
        },
      )
    }
    const updatedCampaign = await db.campaign.update({
      where: {
        id: +params.id,
      },
      data: {
        name: name,
      },
    })

    if (!updatedCampaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        {
          status: 404,
        },
      )
    }

    return NextResponse.json({ success: 'Campaign Updated succesfully' })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      },
    )
  }
}
