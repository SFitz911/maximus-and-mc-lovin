"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { ProductSection } from "@/components/product-section"
import { CheckoutSection } from "@/components/checkout-section"

export default function Home() {
  const [currentView, setCurrentView] = useState<"hero" | "product" | "checkout">("hero")

  return (
    <main className="h-screen w-screen overflow-hidden bg-background">
      {currentView === "hero" && <HeroSection onShopNow={() => setCurrentView("product")} />}
      {currentView === "product" && (
        <ProductSection onBack={() => setCurrentView("hero")} onBuyNow={() => setCurrentView("checkout")} />
      )}
      {currentView === "checkout" && <CheckoutSection onBack={() => setCurrentView("product")} />}
    </main>
  )
}
