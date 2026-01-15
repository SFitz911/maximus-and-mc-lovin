"use client"

import posthog from "posthog-js"

/**
 * Analytics tracking functions using PostHog
 * IMPORTANT: Do NOT track any PII (no card numbers, emails, billing addresses, transaction amounts tied to users)
 */

/**
 * Track page view on landing page
 * @param pageName - Name of the page being viewed (e.g., "landing", "product", "checkout")
 */
export function trackPageView(pageName: string) {
  if (typeof window === "undefined" || !posthog?._isIdentified) return

  posthog.capture("page_view_landing", {
    page_name: pageName,
  })
}

/**
 * Track when a product is clicked/viewed
 * @param productId - ID of the product (e.g., "duo-cruiser-pro")
 * @param productName - Name of the product (e.g., "Duo Cruiser Pro")
 */
export function trackClickedProduct(productId: string, productName: string) {
  if (typeof window === "undefined" || !posthog) return

  posthog.capture("clicked_product", {
    product_id: productId,
    product_name: productName,
  })
}

/**
 * Track when checkout is initiated (user clicks "Buy Now")
 */
export function trackCheckoutInitiated() {
  if (typeof window === "undefined" || !posthog) return

  posthog.capture("checkout_initiated")
}

/**
 * Track when payment form is submitted (user clicks "Pay" button)
 */
export function trackPaymentSubmitted() {
  if (typeof window === "undefined" || !posthog) return

  posthog.capture("payment_submitted")
}

/**
 * Track when payment succeeds
 * @param sessionId - Stripe session ID (non-PII identifier)
 */
export function trackPaymentSucceeded(sessionId?: string) {
  if (typeof window === "undefined" || !posthog) return

  posthog.capture("payment_succeeded", {
    ...(sessionId && { session_id: sessionId }),
  })
}

/**
 * Track when payment fails
 * @param errorType - Type of error (e.g., "card_declined", "network_error")
 */
export function trackPaymentFailed(errorType?: string) {
  if (typeof window === "undefined" || !posthog) return

  posthog.capture("payment_failed", {
    ...(errorType && { error_type: errorType }),
  })
}
