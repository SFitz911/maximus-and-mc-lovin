import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Get Stripe secret key from environment variables
const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set")
  }
  return new Stripe(secretKey, {
    apiVersion: "2025-12-15.clover",
  })
}

// Get webhook secret from environment variables
const getWebhookSecret = () => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET environment variable is not set")
  }
  return webhookSecret
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Stripe
    const stripe = getStripe()
    const webhookSecret = getWebhookSecret()

    // Get the raw request body as text (not JSON parsed) for signature verification
    const body = await request.text()
    
    // Get the stripe-signature header from the request
    const signature = request.headers.get("stripe-signature")

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      )
    }

    // Verify the signature using STRIPE_WEBHOOK_SECRET
    let event: Stripe.Event
    try {
      // Use stripe.webhooks.constructEvent() to verify the signature
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      const error = err as Error
      console.error("Webhook signature verification failed:", error.message)
      // If verification fails, return 400 with "Invalid signature"
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      )
    }

    // Only process the event if verification succeeds

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      console.log("Checkout session completed:", {
        sessionId: session.id,
        customerEmail: session.customer_details?.email,
        amountTotal: session.amount_total,
        currency: session.currency,
        paymentStatus: session.payment_status,
        metadata: session.metadata,
      })

      // Here you can add your business logic, such as:
      // - Send confirmation email
      // - Update order status in database
      // - Fulfill the order
      // - Update inventory
    } else {
      console.log(`Unhandled event type: ${event.type}`)
    }

    // Return 200 status to acknowledge receipt
    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}