"use client"

import type React from "react"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Play, Plus, Info } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface MovieCardProps {
  title: string
  year: string
  duration: string
  rating: string
  categories?: string[]
  trailerUrl: string
  imageId: number
  description: string
}

export default function MovieCard({
  title,
  year,
  duration,
  rating,
  categories,
  trailerUrl,
  imageId,
  description,
}: MovieCardProps) {
  const [showTrailer, setShowTrailer] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setShowTrailer(true)
      setIsExpanded(true)
    }, 3000)
  }

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setShowTrailer(false)
    setIsExpanded(false)
    setIsMuted(true)
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Starting Playback",
      description: `Now playing ${title}`,
    })
  }

  const handleWatchLater = (e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Added to Watch Later",
      description: `${title} has been added to your list`,
    })
  }

  const handleMoreInfo = (e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: title,
      description: description,
    })
  }

  return (
    <div
      className={cn("relative group transition-all duration-500 ease-in-out z-10", isExpanded && "scale-125 z-20")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transformOrigin: "center center" }}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
        <Image
          src={`https://picsum.photos/seed/${imageId}/800/1200`}
          alt={title}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            showTrailer ? "scale-105 opacity-0" : "scale-100 opacity-100",
          )}
        />
        {showTrailer && (
          <div className="absolute inset-0 bg-black">
            <video
              ref={videoRef}
              src={trailerUrl}
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              loop
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
              <h3 className="font-bold text-lg text-white">{title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-200">
                <span>{year}</span>
                <span>•</span>
                <span>{duration}</span>
                <span className="px-1.5 py-0.5 bg-gray-800 rounded text-xs">{rating}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-white text-black hover:bg-white/90" onClick={handlePlayClick}>
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                  onClick={handleWatchLater}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                  onClick={handleMoreInfo}
                >
                  <Info className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 ml-auto"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

