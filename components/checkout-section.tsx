"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Lock, CreditCard, Bike, Check } from "lucide-react"
import Image from "next/image"

interface CheckoutSectionProps {
  onBack: () => void
}

export function CheckoutSection({ onBack }: CheckoutSectionProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 2000)
  }

  if (isComplete) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">Your tandem bike is on its way! Maximus & McLovin thank you.</p>
          <Button
            onClick={() => {
              setIsComplete(false)
              onBack()
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Back to Shop
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-border">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Bike className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">M&M Tandems</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4 text-primary" />
          <span>Secure Checkout</span>
        </div>
      </header>

      {/* Checkout Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 py-6 overflow-hidden">
        {/* Left - Order Summary */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-foreground mb-4">Order Summary</h2>
          <div className="rounded-xl border border-border bg-card p-4 mb-4">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                <Image
                  src="/tandem-bicycle-icon-minimal.jpg"
                  alt="Duo Cruiser Pro"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">Duo Cruiser Pro</h3>
                <p className="text-sm text-muted-foreground">By Maximus & McLovin</p>
                <p className="text-primary font-semibold mt-1">$1,299.00</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
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
                <span className="font-bold text-xl text-foreground">$1,299.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Payment Form */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-foreground mb-4">Payment Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="card" className="text-foreground">
                Card Information
              </Label>
              <div className="relative">
                <Input
                  id="card"
                  placeholder="1234 5678 9012 3456"
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground pr-12"
                />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="MM / YY"
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
                <Input
                  placeholder="CVC"
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Name on Card
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Pay $1,299.00
                  </span>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Stripe placeholder - Your payment info is secure
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
