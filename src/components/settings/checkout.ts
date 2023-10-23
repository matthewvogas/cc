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
    stripePromise = loadStripe(
      'pk_test_51KzxPnDud2nVdnbnzapruSAh1BRmBNMZehpxSkkjsykRSYSIys0oXec2w51BKau16tZOurWmZZu3NomEAcB5VHIv00OvhdWAYH' ||
        '',
    )
  }
  console.log(stripePromise)
  return stripePromise
}

export async function checkout({ lineItems }: CheckoutProps): Promise<void> {
  try {
    const stripe = await getStripe()
    await stripe?.redirectToCheckout({
      mode: 'subscription',
      lineItems,
      successUrl:
        'http://localhost:3000/dashboard/settings?session_id={CHECKOUT_SESSION_ID}',
      cancelUrl: 'http://localhost:3000/dashboard/settings',
    })

  } catch (error) {
    console.error('Error during checkout:', error)
  }
}
