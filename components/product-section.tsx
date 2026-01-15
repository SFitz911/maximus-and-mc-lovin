"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Check, Star, Users, Bike, Weight, Tag } from "lucide-react"
import Image from "next/image"

interface ProductSectionProps {
  onBack: () => void
  onBuyNow: () => void
}

export function ProductSection({ onBack, onBuyNow }: ProductSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [discountCode, setDiscountCode] = useState("")

  const handleBuyNow = async () => {
    setIsLoading(true)
    try {
      // Call the Stripe checkout API
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: "duo-cruiser-pro",
          quantity: 1,
          ...(discountCode.trim() && { discountCode: discountCode.trim() }),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { url } = await response.json()
      
      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Failed to start checkout. Please try again.")
      setIsLoading(false)
    }
  }
  const features = ["Fits 2 Riders", "Aluminum Frame", "Free Assembly", "Lifetime Warranty"]

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
        <div className="w-20"></div>
      </header>

      {/* Product Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 py-6 overflow-hidden">
        {/* Left - Product Image */}
        <div className="flex items-center justify-center">
          <div className="relative group w-full max-w-md">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
              <div className="p-6 bg-secondary/50">
                <Image
                  src="/sleek-modern-tandem-bicycle-for-two-riders-with-du.jpg"
                  alt="Duo Cruiser Pro Dual-Passenger Bicycle"
                  width={400}
                  height={300}
                  className="rounded-xl object-contain w-full h-[200px]"
                />
              </div>
              <div className="p-6 border-t border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(847 reviews)</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>2,453 sold</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Weight className="w-4 h-4" />
                    <span>38 lbs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="flex flex-col justify-center">
          <Badge className="w-fit mb-4 bg-primary/10 text-primary border-primary/20">Best Seller</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Duo Cruiser Pro Dual-Passenger Bicycle
          </h1>
          <p className="text-muted-foreground mb-6">
            Our flagship dual-passenger bicycle, designed by Maximus & McLovin. Two seats, synchronized pedaling, one
            unforgettable ride. Shop online with free shipping and assembly included.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-foreground">$1,299</span>
            <span className="text-xl text-muted-foreground line-through">$1,899</span>
            <Badge variant="destructive" className="bg-accent/10 text-accent border-accent/20">
              32% OFF
            </Badge>
          </div>

          {/* Discount Code Input */}
          <div className="mb-6">
            <Label htmlFor="discount-code" className="text-sm text-muted-foreground mb-2 block">
              Have a discount code?
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="discount-code"
                  type="text"
                  placeholder="Enter code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Discount will be applied at checkout
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleBuyNow}
              disabled={isLoading}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
            >
              {isLoading ? "Loading..." : "Buy Now"}
            </Button>
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary py-6 bg-transparent">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
