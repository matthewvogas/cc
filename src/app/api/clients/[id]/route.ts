import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions)

  try {
    const clientId = parseInt(params.id)
    const client = await ClientsService.findUnique(clientId)

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        {
          status: 404,
        },
      )
    }

    await db.client.delete({
      where: {
        id: clientId,
      },
    })

    return NextResponse.json({ success: `Client with ID ${clientId} deleted` })
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
  const { name } = await req.json()

  try {
    if (!name) {
      return NextResponse.json(
        { error: 'Incomplete fields' },
        {
          status: 400,
        },
      )
    }
    const updatedCampaign = await db.client.update({
      where: {
        id: +params.id,
      },
      data: {
        name: name,
      },
    })

    if (!updatedCampaign) {
      return NextResponse.json(
        { error: 'Client not found to update' },
        {
          status: 404,
        },
      )
    }

    return NextResponse.json({ success: 'Client updated successfully' })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      },
    )
  }
}
