"use client"

import { useEffect } from "react"
import { initPostHog } from "@/instrumentation-client"

/**
 * PostHog Provider Component
 * Initializes PostHog when the app loads
 * Add this to your root layout
 */
export function PostHogProvider() {
  useEffect(() => {
    // Initialize PostHog on mount
    initPostHog()
  }, [])

  return null // This component doesn't render anything
}
