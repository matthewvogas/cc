import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'
import Stripe from 'stripe'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!, {
    apiVersion: '2023-10-16',
  })

  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return new Response(
      JSON.stringify({ error: 'User ID missing from session.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  const { lineItems } = await req.json()
  if (!lineItems || !lineItems.length) {
    return new Response(JSON.stringify({ error: 'Invalid line items.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: lineItems,
      payment_method_types: ['card'],
      mode: 'subscription',
      metadata: { user_id: session.user.id },
      success_url: 'http://localhost:3000/dashboard/settings',
      cancel_url: 'https://example.com/cancel',
    })

    return new Response(JSON.stringify({ sessionId: checkoutSession.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
