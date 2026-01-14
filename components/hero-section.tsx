"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Bike, Users, Truck } from "lucide-react"
import Image from "next/image"

interface HeroSectionProps {
  onShopNow: () => void
}

export function HeroSection({ onShopNow }: HeroSectionProps) {
  return (
    <div className="h-full w-full flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Bike className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">M&M Tandems</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Bikes
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            About Us
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>
        <Button
          variant="outline"
          size="sm"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
        >
          Sign In
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 py-6">
        {/* Left - Content */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary text-sm mb-4 w-fit">
            <Users className="w-4 h-4" />
            <span>Two Riders, One Bike, Endless Adventures</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 text-balance">
            Dual-Passenger
            <span className="text-primary block">Bikes Built for Two</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-md">
            Shop premium dual-passenger bicycles online. Founded by Maximus & McLovin for couples, friends, and duos who
            love riding together.
          </p>
          <div className="flex items-center gap-4 mb-8">
            <Button
              onClick={onShopNow}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-6 text-lg"
            >
              Shop Bikes
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Our Story
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Truck className="w-5 h-5 text-primary" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Bike className="w-5 h-5 text-primary" />
              <span className="text-sm">Lifetime Warranty</span>
            </div>
          </div>
        </div>

        {/* Right - Owners Images */}
        <div className="flex items-center justify-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
              <Image
                src="/images/img-0008.jpg"
                alt="Maximus - Co-Founder"
                width={280}
                height={350}
                className="object-cover w-full h-[280px] md:h-[350px]"
              />
              <div className="p-4 bg-card">
                <h3 className="font-semibold text-foreground">Maximus</h3>
                <p className="text-sm text-muted-foreground">Co-Founder</p>
              </div>
            </div>
          </div>

          <div className="relative group mt-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
              <Image
                src="/images/img-0009.jpg"
                alt="McLovin - Co-Founder"
                width={280}
                height={350}
                className="object-cover w-full h-[280px] md:h-[350px]"
              />
              <div className="p-4 bg-card">
                <h3 className="font-semibold text-foreground">McLovin</h3>
                <p className="text-sm text-muted-foreground">Co-Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
