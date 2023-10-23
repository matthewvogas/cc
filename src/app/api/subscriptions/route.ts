import { authOptions } from '../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import db from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  const body = await req.text()

  const signature = headers().get('Stripe-Signature') as string
  const sessionUser = await getServerSession(authOptions)

  console.log(sessionUser)

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.SIGNING_SECRET!,
    )
  } catch (err) {
    return NextResponse.json({
      status: 400,
      body: { message: `Webhook Error: ${err}` },
    })
  }

  const session = event.data.object as Stripe.Checkout.Session
  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    )

    const currentDate = new Date()
    currentDate.setMonth(currentDate.getMonth() + 1)

    const subscriptions = await db.suscriptions.create({
      data: {
        userId: 'clo33ggph0000pvly61ealv3u',
        subscriptionId: subscription.id,
        priceId: subscription.items.data[0].price.id,
        payment_method: 'STRIPE',
        currentPeriodEnd: currentDate,
        customerId: subscription.customer as string,
      },
    })
    console.log(subscriptions)
    return NextResponse.json({ status: 200, body: { message: 'Ok' } })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    const userSubscription = await db.suscriptions.findFirst({
      where: {
        userId: 'clo33ggph0000pvly61ealv3u',
      },
    })

    if (!userSubscription) {
      return NextResponse.json({
        success: false,
        message: 'El usuario no tiene una suscripción.',
      })
    }

    return NextResponse.json({
      success: true,
      subscription: userSubscription,
    })
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
