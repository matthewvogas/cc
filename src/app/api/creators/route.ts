import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { CreatorsService } from '@/services/CreatorsService'
import { NextApiRequest, NextApiResponse } from 'next'

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
// export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const session = await getServerSession(authOptions)

//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const { creatorId } = req.query

//     if (!creatorId) {
//       return res
//         .status(400)
//         .json({ error: 'CreatorId is missing from the route parameters' })
//     }

//     // Verificar si el creador existe antes de intentar eliminarlo
//     const creator = await CreatorsService.findById(creatorId)
//     if (!creator) {
//       return res.status(404).json({ error: 'Creator not found' })
//     }

//     await db.creator.delete({
//       where: {
//         id: parseInt(creatorId),
//       },
//     })

//     return NextResponse.json({ success: 'creator deleted' })
//   } catch (err: any) {
//     console.log(err)
//     return NextResponse.json({ err: err.message }, { status: 500 })
//   }
// }
