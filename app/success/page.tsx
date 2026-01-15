"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check, Bike, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading to show the session was processed
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Processing your order...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-primary" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-foreground mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase! Your order has been confirmed and Maximus & McLovin are preparing your tandem bicycle.
        </p>

        {/* Session ID (for debugging) */}
        {sessionId && (
          <div className="bg-secondary rounded-lg p-4 mb-6">
            <p className="text-xs text-muted-foreground mb-1">Order ID</p>
            <p className="text-sm font-mono text-foreground break-all">{sessionId}</p>
          </div>
        )}

        {/* Order Details */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bike className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Duo Cruiser Pro</h3>
              <p className="text-sm text-muted-foreground">Dual-Passenger Bicycle</p>
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">$1,299.00</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-primary">FREE</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-lg text-foreground">$1,299.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-foreground mb-2">
            <strong>What's next?</strong>
          </p>
          <p className="text-xs text-muted-foreground">
            You'll receive an email confirmation shortly. Our team will prepare your bicycle and ship it within 3-5 business days.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 border-border text-foreground hover:bg-secondary"
          >
            <Link href="/">Shop More</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
