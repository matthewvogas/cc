import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
import { CampaignsService } from '@/services/CampaignsService'
import { ClientsService } from '@/services/ClientsServices'
import db from '@/lib/db'

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

export async function DELETE(req: Request, {params}: {params: {id: string} }){

  const session = await getServerSession(authOptions)

  if(!session) {
    return NextResponse.json({error: 'Unauthorized'},  {status: 400} )
  }

}
