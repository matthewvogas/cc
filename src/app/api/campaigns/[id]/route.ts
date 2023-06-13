import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
import { CamapignsService } from '@/services/CampaignsService'

export async function GET(
  Request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions)
  const campaignService = new CamapignsService(session!.user.id)
  try {
    const campaign = await campaignService.findUnique(parseInt(params.id))
    return NextResponse.json(campaign)
  } catch (err: any) {
    return NextResponse.json(err.message, {
      status: 404,
    })
  }
}
