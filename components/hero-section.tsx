"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bike, Users, Truck, RotateCcw } from "lucide-react"

interface HeroSectionProps {
  onShopNow: () => void
}

export function HeroSection({ onShopNow }: HeroSectionProps) {
  // Encode the video path to handle apostrophe properly
  const videoSrc = encodeURI("/video/You_didn't_use_my_image_of_McL.mp4")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showReplay, setShowReplay] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)

  // Auto-play video after 3-5 second delay on component mount
  useEffect(() => {
    const delay = Math.random() * 2000 + 3000 // Random delay between 3-5 seconds
    const timer = setTimeout(() => {
      if (videoRef.current && !hasPlayed) {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error)
        })
        setHasPlayed(true)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [hasPlayed])

  const handleVideoEnded = () => {
    setShowReplay(true)
  }

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch((error) => {
        console.error("Error replaying video:", error)
      })
      setShowReplay(false)
    }
  }
  
  return (
    <div className="h-full w-full flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Bike className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Tandem Kubernetes Bicycle Company</span>
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

        {/* Right - Video */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
            Tandem Kubernetes Bicycle Company
          </h2>
          <div className="relative group w-full max-w-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
              <video
                ref={videoRef}
                muted
                playsInline
                onEnded={handleVideoEnded}
                className="w-full h-auto object-cover"
                style={{ maxHeight: "600px" }}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          {showReplay && (
            <div className="mt-4">
              <Button
                onClick={handleReplay}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Replay
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
