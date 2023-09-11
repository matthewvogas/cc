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


export async function DELETE(req: Request, {params}: {params: {id: string} }) {



  try{
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }


    const creatorId = parseInt(params.id)

    await CreatorsService.deleteCreatorById(creatorId, session.user.id)


    return NextResponse.json({success: 'Creator deleted'})
  } catch (err: any) {
    console.log(err)
      return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      }
    );
  }
  
}