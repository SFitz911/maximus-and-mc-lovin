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

// Server-side product definitions - NEVER trust prices from the frontend
const PRODUCTS = {
  "duo-cruiser-pro": {
    name: "Duo Cruiser Pro Dual-Passenger Bicycle",
    price: 129900, // $1,299.00 in cents (server-side price)
    description: "Our flagship dual-passenger bicycle, designed by Maximus & McLovin. Two seats, synchronized pedaling, one unforgettable ride.",
  },
  // Add more products here as needed
} as const

// Server-side discount codes - NEVER trust discount amounts from the frontend
const DISCOUNT_CODES = {
  SAVE10: 0.1, // 10% off
  WELCOME20: 0.2, // 20% off
} as const

export async function POST(request: NextRequest) {
  try {
    // Initialize Stripe
    const stripe = getStripe()

    // Parse request body
    const body = await request.json()
    const { productId, quantity = 1, discountCode } = body

    // Validate product ID exists
    if (!productId || !PRODUCTS[productId as keyof typeof PRODUCTS]) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      )
    }

    // Get product from server-side definition (NEVER use price from request body)
    const product = PRODUCTS[productId as keyof typeof PRODUCTS]

    // Validate quantity
    const itemQuantity = Math.max(1, Math.floor(quantity || 1))

    // Look up discount code server-side (silently ignore invalid codes)
    let finalPrice: number = Number(product.price)
    let discountPercentage = 0
    
    if (discountCode && typeof discountCode === "string") {
      const discount = DISCOUNT_CODES[discountCode.toUpperCase() as keyof typeof DISCOUNT_CODES]
      if (discount !== undefined) {
        discountPercentage = discount
        // Calculate discounted price (round to nearest cent)
        finalPrice = Math.round(Number(product.price) * (1 - discountPercentage))
      }
      // Silently ignore invalid codes - don't reveal which codes exist
    }

    // Get base URL for redirects
    const origin = request.headers.get("origin") || 
                   request.nextUrl.origin ||
                   (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000")

    // Create Stripe checkout session with server-side price and discount
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: finalPrice, // Server-side price with discount applied (in cents)
          },
          quantity: itemQuantity,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        productId: productId as string,
        ...(discountCode && discountPercentage > 0 && {
          discountCode: discountCode.toUpperCase(),
          originalPrice: product.price.toString(),
          discountPercentage: (discountPercentage * 100).toString(),
        }),
      },
    })

    // Return checkout URL
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}