"use client";

import type React from "react";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Plus, Info, PlayIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  title: string;
  year: string;
  duration: string;
  rating: string;
  categories?: string[];
  trailerUrl: string;
  imageId: number;
  description: string;
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
  const [showTrailer, setShowTrailer] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setShowTrailer(true);
      setIsExpanded(true);
    }, 1500);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setShowTrailer(false);
    setIsExpanded(false);
    setIsMuted(true);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Starting Playback",
      description: `Now playing ${title}`,
    });
  };

  const handleWatchLater = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Added to Watch Later",
      description: `${title} has been added to your list`,
    });
  };

  const handleMoreInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: title,
      description: description,
    });
  };

  return (
    <div
      className={cn(
        "relative group transition-all duration-500 ease-in-out z-10",
        isExpanded && "scale-125 z-20"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transformOrigin: "center center" }}
    >
      <div className='relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg'>
        {!showTrailer && (
          <div
            className='absolute w-full h-full top-0 left-0 z-10 flex flex-col justify-end py-4 cursor-pointer'
            style={{
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9))",
            }}
          >
            <div className='space-y-2 mb-2'>
              <h1 className='text-md font-bold text-white px-4 line-clamp-1'>
                {title}
              </h1>
              {categories && (
                <p className='text-sm text-gray-200 px-4 line-clamp-1'>
                  {categories.join(" ")}
                </p>
              )}
              <div className='flex items-center gap-2 px-4 whitespace-nowrap'>
                <span className='text-xs text-gray-400'>{year}</span>
                <span className='text-xs text-gray-400'>{duration}</span>
                <span className='text-xs text-gray-400'>{rating}</span>
              </div>
            </div>
            <div className='w-full flex justify-between px-4 gap-1'>
              <Button
                size='sm'
                variant={"ghost"}
                className='w-full hover:bg-white/90 hover:text-black'
                onClick={() => router.push(`/movie/${imageId}`)}
              >
                <PlayIcon className='w-4 h-4' />
              </Button>
              <Button
                size='sm'
                variant={"ghost"}
                className='w-full hover:bg-white/90 hover:text-black'
                onClick={handleWatchLater}
              >
                <Plus className='w-4 h-4' />
              </Button>
              <Button
                size='sm'
                variant={"ghost"}
                className='w-full hover:bg-white/90 hover:text-black'
                onClick={handleMoreInfo}
              >
                <Info className='w-4 h-4' />
              </Button>
            </div>
          </div>
        )}
        <Image
          src={`https://picsum.photos/seed/${imageId}/800/1200`}
          alt={title}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            showTrailer ? "scale-105 opacity-0" : "scale-100 opacity-100"
          )}
        />
        {showTrailer && (
          <div className='absolute inset-0 bg-black'>
            <video
              ref={videoRef}
              src={trailerUrl}
              className='w-full h-full object-cover'
              autoPlay
              muted={isMuted}
              loop
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent' />
            <div className='absolute bottom-0 left-0 right-0 p-4 space-y-3'>
              <h3 className='font-bold text-md text-white line-clamp-1'>{title}</h3>
              <div className='flex items-center gap-2 text-sm text-gray-200'>
                <span>{year}</span>
                <span>•</span>
                <span>{duration}</span>
                <span className='px-1.5 py-0.5 rounded text-xs whitespace-nowrap'>
                  {rating}
                </span>
              </div>
              <div className='flex gap-2'>
                <Button
                  size='sm'
                  variant={"ghost"}
                  className='border border-white hover:text-black'
                  onClick={handlePlayClick}
                >
                  <Play className='w-4 h-4 mr-2' />
                  Play
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  className='border border-white hover:text-black'
                  onClick={handleWatchLater}
                >
                  <Plus className='w-4 h-4' />
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  className='border border-white hover:text-black'
                  onClick={handleMoreInfo}
                >
                  <Info className='w-4 h-4' />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
