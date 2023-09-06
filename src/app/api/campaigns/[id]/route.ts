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
