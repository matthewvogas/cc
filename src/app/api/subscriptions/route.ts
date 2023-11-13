import { authOptions } from '../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import db from '@/lib/db'
import { subscriptionType } from '@prisma/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  let event: Stripe.Event
  const sessionUser = await getServerSession(authOptions)
  try {
    const signature = headers().get('Stripe-Signature') as string

    const body = await req.text()

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.TEST_SIGNING_SECRET!,
    )

    const session = event.data.object as Stripe.Checkout.Session
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session?.metadata?.user_id
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      )

      const currentDate = new Date()

      const price = await stripe.prices.retrieve(
        subscription.items.data[0].price.id,
      )
      const billingInterval = price.recurring?.interval

      if (billingInterval === 'month') {
        currentDate.setMonth(currentDate.getMonth() + 1)
      } else if (billingInterval === 'year') {
        currentDate.setFullYear(currentDate.getFullYear() + 1)
      }

      let subtype =
        subscription.items.data[0].price.id ===
          'price_1OAF90Dud2nVdnbnxAgbOyXq' ||
        subscription.items.data[0].price.id === 'price_1OAFFmDud2nVdnbnrrdKcgTK'
          ? 'YES'
          : 'ABSOLUTELY'

      await db.suscriptions.upsert({
        where: {
          userId: session?.metadata?.user_id,
        },
        update: {
          subscriptionType: subtype as subscriptionType,
          priceId: subscription.items.data[0].price.id,
          payment_method: 'STRIPE',
          subscriptionId: subscription.id,
          currentPeriodEnd: currentDate,
          customerId: subscription.customer as string,
          status: 'ACTIVE',
        },
        create: {
          userId: userId as string,
          subscriptionId: subscription.id,
          priceId: subscription.items.data[0].price.id,
          payment_method: 'STRIPE',
          currentPeriodEnd: currentDate,
          customerId: subscription.customer as string,
          subscriptionType: subtype as subscriptionType,
        },
      })

      return NextResponse.json({
        status: 200,
        'subscriptions success': subscription,
      })
    }
  } catch (error) {
    return NextResponse.json({
      status: 400,
      body: { message: `Webhook Error: ${error}` },
    })
  }
}

export async function GET(req: NextRequest) {
  try {
    const sessionStripe = await getServerSession(authOptions)

    console.log(sessionStripe?.user.id)

    const userSubscription = await db.suscriptions.findFirst({
      where: {
        userId: sessionStripe?.user.id,
      },
    })

    if (!userSubscription) {
      return NextResponse.json(
        {
          success: false,
          message: 'El usuario no tiene una suscripción.',
        },
        {
          status: 404,
        },
      )
    }

    let price, billingInterval, priceAmount

    if (userSubscription.priceId) {
      price = await stripe.prices.retrieve(userSubscription.priceId)
      billingInterval = price.recurring?.interval
      priceAmount = price.unit_amount! / 100
    }

    const customer = await stripe.customers.retrieve(
      userSubscription.customerId,
    )
    const paymentMethods = await stripe.paymentMethods.list({
      customer: userSubscription.customerId,
      type: 'card',
    })

    const cardDetails =
      paymentMethods.data.length > 0 ? paymentMethods.data[0].card : null

    console.log(userSubscription.status)
    return NextResponse.json(
      {
        success: true,
        subscription: userSubscription,
        price: priceAmount,
        customer: customer,
        cardDetails: cardDetails
          ? {
              last4: cardDetails.last4,
              expMonth: cardDetails.exp_month,
              expYear: cardDetails.exp_year,
              brand: cardDetails.brand,
            }
          : null,
        billingInterval: billingInterval,
        subscriptionType: userSubscription.subscriptionType,
        status: userSubscription.status,
      },
      {
        status: 200,
      },
    )
  } catch (err: any) {
    console.log(err)
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      },
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const sessionStripe = await getServerSession(authOptions)

    const userSubscription = await db.suscriptions.findFirst({
      where: {
        userId: sessionStripe?.user.id,
      },
    })

    if (!userSubscription) {
      return NextResponse.json({
        success: false,
        message: 'El usuario no tiene una suscripción.',
      })
    }

    await db.suscriptions.update({
      where: {
        id: userSubscription.id,
      },
      data: {
        status: 'CANCELED',
        subscriptionId: null,
        priceId: null,
        subscriptionType: null,
      },
    })

    const canceledSubscription = await stripe.subscriptions.cancel(
      userSubscription.subscriptionId!,
    )

    return NextResponse.json({
      success: true,
      userSubscription: userSubscription,
      message: 'Suscripción cancelada.',
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

// export async function PATCH(req: NextRequest) {
//   try {
//     const sessionStripe = await getServerSession(authOptions)

//     if (!sessionStripe?.user?.id) {
//       throw new Error('Authentication required.')
//     }

//     // Obtener la suscripción del usuario
//     const userSubscription = await db.suscriptions.findFirst({
//       where: {
//         userId: sessionStripe.user.id,
//       },
//     })

//     // Si el usuario no tiene una suscripción o si está cancelada, crear una nueva sesión de checkout
//     if (!userSubscription || userSubscription.status === 'CANCELED') {
//       // Aquí deberías determinar el priceId de alguna manera, posiblemente desde el cuerpo de la solicitud o una lógica de negocio predeterminada
//       const priceId = 'price_xxx' // Reemplaza con la lógica adecuada para obtener el priceId

//       const checkoutSession = await stripe.checkout.sessions.create({
//         customer: sessionStripe.user.id, // Asegúrate de que este es el ID de cliente correcto en Stripe
//         payment_method_types: ['card'],
//         line_items: [
//           {
//             price: priceId,
//             quantity: 1,
//           },
//         ],
//         mode: 'subscription',
//         success_url:
//           'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
//         cancel_url: 'https://example.com/cancel',
//         metadata: {
//           userId: sessionStripe.user.id,
//         },
//       })

//       return NextResponse.json({
//         success: true,
//         sessionId: checkoutSession.id,
//         message: 'Nueva sesión de checkout creada para recompra.',
//       })
//     }

//     // Si la suscripción no está cancelada, actualizar la suscripción existente
//     // ... (mantén el resto de tu lógica de actualización aquí)
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json(
//       {
//         success: false,
//         error: err,
//       },
//       {
//         status: 500,
//       },
//     )
//   }
// }
