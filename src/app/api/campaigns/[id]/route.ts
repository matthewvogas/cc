import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'

export async function GET(
  Request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const campaign = await CampaignsService.findUnique(parseInt(params.id))
    return NextResponse.json(campaign)
  } catch (err: any) {
    return NextResponse.json(err.message, {
      status: 404,
    })
  }
}
