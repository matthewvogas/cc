import { loadStripe, Stripe } from '@stripe/stripe-js'

interface LineItem {
  price: string
  quantity: number
}

interface CheckoutProps {
  lineItems: LineItem[]
}

let stripePromise: Promise<Stripe | null> | undefined

const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY! || '')
  }
  console.log(stripePromise)
  return stripePromise
}

export async function checkout({ lineItems }: CheckoutProps): Promise<void> {
  try {
    const stripe = await getStripe()
    if (!stripe) {
      throw new Error('Stripe not found')
    }

    const res = await fetch('/api/subscriptions/checkoutSession', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lineItems }),
    })
    const session = await res.json()

    if (res.ok && session.sessionId) {
      await stripe?.redirectToCheckout({ sessionId: session.sessionId })
    }
  } catch (error) {
    console.error('Error during checkout:', error)
  }
}
