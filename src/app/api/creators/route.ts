import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { CreatorsService } from '@/services/CreatorsService'

export async function GET(req: NextRequest) {
  try {
    // if (!session)
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('campaign')
    if (id) {
      const campaign = await CreatorsService.findByCampaignId(parseInt(id))
      return NextResponse.json(campaign)
    }
    const creators = await CreatorsService.findMany(session!.user.id)
    return NextResponse.json(creators)
  } catch (err) {
    console.log(err)
    return NextResponse.json(err, {
      status: 500,
    })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    // if (!session)
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    const currentUser = await db.user.findUnique({
      where: {
        email: session?.user!.email!,
      },
    })
    const { name, email } = await req.json()

    await db.client.create({
      data: {
        name,
        email,
        userId: currentUser?.id!,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      },
    )
  }
}

 export async function DELETE(req :Request ) {
  
  try{
    const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
; // Get the campaignId from the query parameter

  const { searchParams } = new URL(req.url)

  const campaignIdParam = searchParams.get('campaingId')


  const campaignId = parseInt(campaignIdParam)

  const creators = await CreatorsService.getCreatorsByCampaignId(campaignId)


  await db.creator.deleteMany({
  
  })

  console.log(session.user.id)

  return NextResponse.json({success: 'creators deleted'})


  } catch (err: any){
    console.log(err)
    return NextResponse.json({err: err.message}, {status: 500})
  }

  
  
 }
