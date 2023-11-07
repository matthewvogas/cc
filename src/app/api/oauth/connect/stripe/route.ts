import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import db from '@/lib/db'
import { subscriptionType } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
  // session ID
  const session = await getServerSession(authOptions)

  const { searchParams } = new URL(req.url)

  // params
  const yes = searchParams.get('yes')
  const absolutely = searchParams.get('absolutely')
  const userId = session?.user.id

  // find
  const subscriptionId = await db.suscriptions.findFirst({
    where: {
      userId: String(userId),
    },
  })

  // update
  const subscription = await db.suscriptions.update({
    where: {
      id: String(subscriptionId!.id),
    },
    data: {
      subscriptionType:
        (String(yes) as subscriptionType) 
        // || (String(absolutely) as subscriptionType),
    },
  })

  // callback
  const successUrl = `http://localhost:3000/dashboard/settings`

  // Succes subscription
  console.log(subscription)

  // redirect callback
  return NextResponse.json(subscription, { status: 200 })
  // return NextResponse.redirect(successUrl, { status: 302 })
}
