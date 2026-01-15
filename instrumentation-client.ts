"use client"

import posthog from "posthog-js"

/**
 * Initialize PostHog analytics client-side
 * This function should be called once when the app loads
 */
export function initPostHog() {
  // Only initialize in browser environment
  if (typeof window === "undefined") return

  // Get API keys from environment variables (NEXT_PUBLIC_ prefix makes them available client-side)
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

  // Don't initialize if keys are missing
  if (!posthogKey || !posthogHost) {
    if (process.env.NODE_ENV === "development") {
      console.warn("PostHog: API key or host not configured. Skipping initialization.")
      console.warn("Please set NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST in .env.local")
    }
    return
  }

  // Initialize PostHog
  posthog.init(posthogKey, {
    api_host: posthogHost,
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") {
        console.log("PostHog initialized successfully")
      }
    },
    // Capture page views automatically
    capture_pageview: true,
    // Capture page views on route changes (for Next.js)
    capture_pageleave: true,
    // Disable session recording by default (enable if needed)
    disable_session_recording: false,
    // Persist across page reloads
    persistence: "localStorage",
  })

  // Make PostHog available globally for debugging
  if (typeof window !== "undefined") {
    ;(window as any).posthog = posthog
  }
}
