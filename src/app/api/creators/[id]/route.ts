import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import { CreatorsService } from '@/services/CreatorsService'

export async function GET(
  Request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions)
    const creator = await CreatorsService.findUnique(
      parseInt(params.id),
      session!.user.id,
    )
    return NextResponse.json(creator)
  } catch (err: any) {
    return NextResponse.json(err.message, {
      status: 404,
    })
  }
}
