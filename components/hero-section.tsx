"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowRight, Bike, Users, Truck, RotateCcw, Play, Star } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface HeroSectionProps {
  onShopNow: () => void
}

export function HeroSection({ onShopNow }: HeroSectionProps) {
  // Video path - file renamed to remove apostrophe for better compatibility
  const videoSrc = "/video/You_didnt_use_my_image_of_McL.mp4"
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showReplay, setShowReplay] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [showStory, setShowStory] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Debug: log when component mounts
  useEffect(() => {
    console.log("HeroSection mounted, videoSrc:", videoSrc)
  }, [])

  // Auto-play video after 3-5 second delay on component mount
  // Start muted for autoplay (browser requirement), then unmute when user interacts
  useEffect(() => {
    const delay = Math.random() * 2000 + 3000 // Random delay between 3-5 seconds
    const timer = setTimeout(() => {
      if (videoRef.current && !hasPlayed && !videoError) {
        // Start muted for autoplay to work
        videoRef.current.muted = true
        setIsMuted(true)
        videoRef.current.play()
          .then(() => {
            setIsPlaying(true)
            setHasPlayed(true)
          })
          .catch((error) => {
            console.error("Error playing video:", error)
            setVideoError(true)
          })
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [hasPlayed, videoError])

  const handleVideoEnded = () => {
    setShowReplay(true)
    setIsPlaying(false)
  }

  const handlePlay = () => {
    if (videoRef.current) {
      // Unmute when user clicks play
      videoRef.current.muted = false
      setIsMuted(false)
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setShowReplay(false)
          setHasPlayed(true)
        })
        .catch((error) => {
          console.error("Error playing video:", error)
          setVideoError(true)
        })
    }
  }

  const handleReplay = () => {
    if (videoRef.current) {
      // Keep unmuted for replay (user-initiated)
      videoRef.current.muted = false
      setIsMuted(false)
      videoRef.current.currentTime = 0
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setShowReplay(false)
        })
        .catch((error) => {
          console.error("Error replaying video:", error)
        })
    }
  }

  const handleVideoPlay = () => {
    setIsPlaying(true)
    setShowReplay(false)
  }

  const handleVideoPause = () => {
    setIsPlaying(false)
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
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setShowStory(true)}
            >
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
            Maximus and McLovin - Founders
          </h2>
          <div className="relative group w-full max-w-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
              <video
                ref={videoRef}
                muted={isMuted}
                playsInline
                controls
                onEnded={handleVideoEnded}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onLoadedData={() => {
                  console.log("Video loaded successfully")
                  setVideoError(false)
                }}
                onError={(e) => {
                  const video = e.currentTarget
                  const error = video.error
                  console.error("Video error:", error)
                  console.error("Error code:", error?.code)
                  console.error("Error message:", error?.message)
                  console.error("Video src:", videoSrc)
                  setVideoError(true)
                }}
                className="w-full h-auto object-cover"
                style={{ maxHeight: "600px" }}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {(!isPlaying && !showReplay) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Button
                    onClick={handlePlay}
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-8 rounded-full"
                  >
                    <Play className="w-8 h-8 mr-2" fill="currentColor" />
                    Play Video
                  </Button>
                </div>
              )}
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
          {videoError && (
            <div className="mt-4 text-sm text-destructive">
              <p>Video failed to load. Please check the console for details.</p>
              <p className="text-xs mt-1">Trying to load: {videoSrc}</p>
            </div>
          )}
        </div>
      </div>

      {/* Our Story Dialog */}
      <Dialog open={showStory} onOpenChange={setShowStory}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              The Legend of Maximus & McLovin: A Tale of Two Wheels and One Red Menace
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              How two mates from Wellington decided to beat a cable car. Seriously.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-foreground pt-4">
            <p className="text-base leading-relaxed">
              Picture this: Wellington, New Zealand. 2023. A crisp morning. Two mates, Maximus and McLovin, are standing at the bottom of the famously steep Lambton Quay, staring up at the iconic red cable car chugging its way up the hill.
            </p>
            
            <p className="text-base leading-relaxed">
              "I bet we could beat that," Maximus says, squinting at the cable car like it personally offended him. 
              <span className="text-muted-foreground italic"> (He says this about most things, to be fair.)</span>
            </p>
            
            <p className="text-base leading-relaxed">
              "Mate, that's a cable car. It runs on electricity and rails. We have... legs," McLovin replies, already calculating the physics of this terrible idea in his head. 
              <span className="text-muted-foreground italic"> But here's the thing—he was also already calculating how to win.</span>
            </p>
            
            <p className="text-base leading-relaxed">
              So begins the most ridiculous business plan in cycling history. See, Maximus and McLovin quickly realized that <span className="font-semibold text-primary">one person pedaling wasn't going to cut it</span>. Wellington hills don't mess around—they're like staircases that forgot they're supposed to be roads.
            </p>
            
            <p className="text-base leading-relaxed">
              "What if," Maximus proposes, eyes gleaming with the kind of madness that either leads to greatness or an A&E visit, 
              <span className="text-primary font-semibold"> "we had TWO people pedaling? Dual power!"</span>
            </p>
            
            <p className="text-base leading-relaxed">
              McLovin, being the sensible one 
              <span className="text-muted-foreground italic"> (relatively speaking)</span>, points out that tandem bikes exist. But not like THIS. Not bikes engineered specifically to <span className="font-semibold">dominate a hill and show a cable car who's boss</span>.
            </p>
            
            <p className="text-base leading-relaxed">
              Six months later, after more failed attempts than they'd care to admit 
              <span className="text-muted-foreground italic"> (cable car drivers were starting to wave at them by name)</span>, they did it. They beat the red cable car. By three whole seconds. They celebrated like they'd won the Tour de France. 
              <span className="text-muted-foreground italic"> The cable car, presumably, was unimpressed. Cable cars are notoriously bad sports.</span>
            </p>
            
            <p className="text-base leading-relaxed">
              And that, dear reader, is how Tandem Kubernetes Bicycle Company was born. Not from market research or customer surveys or any of that sensible nonsense. Just pure, unadulterated 
              <span className="text-primary font-semibold"> "we're gonna beat that cable car"</span> energy.
            </p>
            
            <p className="text-base leading-relaxed">
              Today, our bikes are still built with that same spirit: <span className="font-semibold">two riders, one mission, zero limits</span>. Whether you're racing cable cars, conquering hills, or just enjoying the ride with someone special, we've got you covered.
            </p>
            
            <p className="text-base leading-relaxed pt-2 border-t border-border">
              <span className="font-semibold">P.S.</span> The cable car still hasn't forgiven us. We hear it mutters about "cheating" when we pass. 
              <span className="text-muted-foreground italic"> Worth it.</span>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
