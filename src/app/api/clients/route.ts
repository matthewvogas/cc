import db from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { ClientsService } from '@/services/ClientsServices'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // if (!session)
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const clients = await ClientsService.findMany(session!.user.id)
    return NextResponse.json(clients)
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
    const { name, email, tags } = await req.json()

    // Check if the tags already exist in the database
    const existingTags = await db.tag.findMany({
      where: {
        name: {
          in: tags,
        },
      },
    })

    // Create any new tags that don't already exist
    const existingTagNames = existingTags.map(tag => tag.name)
    const newTags = tags.filter(
      (tag: string) => !existingTagNames.includes(tag),
    )
    await db.tag.createMany({
      data: newTags.map((tag: any) => ({ name: tag })),
    })

    // Create the new client and associate the tags with it
    const client = await db.client.create({
      data: {
        userId: session!.user.id,
        name,
        email,
        tags: {
          connect: tags.map((tag: any) => ({ name: tag })),
        },
      },
    })

    // Create the new client and associate the tags with it
    // const client = await db.client.create({
    //   data: {
    //     userId: session!.user.id,
    //     name,
    //     email,
    //     tags: {
    //       create: [
    //         {
    //           tag: {
    //             create: {
    //               name: 'test',
    //             }
    //           }
    //         }
    //       ]
    //     }
    //   },
    // })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json(
      { error: err.message },
      {
        status: 500,
      },
    )
  }
}


export async function DELETE(req: Request){
  try{

    const session = await getServerSession(authOptions)

    if(!session){
      return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    
    await db.client.deleteMany({
      where:{
        userId: session!.user.id,
      },
    })

    return NextResponse.json({success: 'All clients deleted'})

  } catch (err: any){
   console.log(err)

   return NextResponse.json(
    {error: err.message},
    {
      status: 500,
    })
  }
}