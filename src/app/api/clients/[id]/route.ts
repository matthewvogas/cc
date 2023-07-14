import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import { ClientsService } from '@/services/ClientsServices'

export async function GET(
  Request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const client = await ClientsService.findUnique(parseInt(params.id))
    return NextResponse.json(client)
  } catch (err: any) {
    return NextResponse.json(err.message, {
      status: 404,
    })
  }
}
