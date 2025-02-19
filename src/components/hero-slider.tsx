"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Play,
  Plus,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface Movie {
  id: number;
  title: string;
  categories: string[];
  year: string;
  duration: string;
  rating: string;
  description: string;
  trailerUrl: string;
  slider_duration: number;
}

const movies: Movie[] = [
  {
    id: 1,
    title: "Nevertheless",
    categories: ["KDRAMA", "ROMANTIC"],
    year: "2021",
    duration: "170 mins",
    rating: "TV-MA",
    description:
      "A young mother and her young daughter, who are in love, meet the love of their family.",
    trailerUrl: "/trailers/nevertheless.mp4",
    slider_duration: 170.271927 * 1000,
  },
  {
    id: 2,
    title: "The Matrix Resurrections",
    categories: ["ACTION", "SCI-FI"],
    year: "2023",
    duration: "148 mins",
    rating: "TV-MA",
    description:
      "Return to a world of two realities: one, everyday life; the other, what lies behind it.",
    trailerUrl: "/trailers/trailer.mp4",
    slider_duration: 10000,
  },
  {
    id: 3,
    title: "Nevertheless",
    categories: ["KDRAMA", "ROMANTIC"],
    year: "2021",
    duration: "170 mins",
    rating: "TV-MA",
    description:
      "A young mother and her young daughter, who are in love, meet the love of their family.",
    trailerUrl: "/trailers/nevertheless.mp4",
    slider_duration: 170.271927 * 1000,
  },
  {
    id: 4,
    title: "Dune",
    categories: ["SCI-FI", "ADVENTURE"],
    year: "2023",
    duration: "155 mins",
    rating: "TV-MA",
    description:
      "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset.",
    trailerUrl: "/trailers/trailer.mp4",
    slider_duration: 10000,
  },
  {
    id: 5,
    title: "Nevertheless",
    categories: ["KDRAMA", "ROMANTIC"],
    year: "2021",
    duration: "170 mins",
    rating: "TV-MA",
    description:
      "A young mother and her young daughter, who are in love, meet the love of their family.",
    trailerUrl: "/trailers/nevertheless.mp4",
    slider_duration: 170.271927 * 1000,
  },
  {
    id: 6,
    title: "Dune",
    categories: ["SCI-FI", "ADVENTURE"],
    year: "2023",
    duration: "155 mins",
    rating: "TV-MA",
    description:
      "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset.",
    trailerUrl: "/trailers/trailer.mp4",
    slider_duration: 10000,
  },
  {
    id: 7,
    title: "Nevertheless",
    categories: ["KDRAMA", "ROMANTIC"],
    year: "2021",
    duration: "170 mins",
    rating: "TV-MA",
    description:
      "A young mother and her young daughter, who are in love, meet the love of their family.",
    trailerUrl: "/trailers/nevertheless.mp4",
    slider_duration: 170.271927 * 1000,
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const arrowEventListener = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    document.addEventListener("keydown", arrowEventListener);

    return () => {
      document.removeEventListener("keydown", arrowEventListener);
    };
  }, []);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % movies.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        handleNext();
      }
    }, movies[currentSlide].slider_duration || 10000);
    return () => clearInterval(timer);
  }, [isTransitioning]); // Removed handleNext from dependencies

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handlePlayNow = () => {
    toast({
      title: "Starting Playback",
      description: `Now playing ${movies[currentSlide].title}`,
    });
  };

  const handleWatchLater = () => {
    toast({
      title: "Added to Watch Later",
      description: `${movies[currentSlide].title} has been added to your list`,
    });
  };

  const handleSlideChange = (index: number) => {
    if (isTransitioning || index === currentSlide) return;

    setIsTransitioning(true);
    setCurrentSlide(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const currentMovie = movies[currentSlide];

  return (
    <section className='relative h-[80vh] w-full overflow-hidden'>
      {/* Full-width background video */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className='absolute inset-0 w-full'
        >
          <video
            ref={videoRef}
            className='absolute inset-0 w-full h-full object-cover'
            autoPlay
            muted={isMuted}
            loop
            src={currentMovie.trailerUrl}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-[#0a0a1a] to-transparent' />
        </motion.div>
      </AnimatePresence>

      {/* Content container */}
      <div className='relative h-full max-w-screen-2xl mx-auto px-4'>
        {/* Navigation Arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='absolute inset-x-4 top-1/2 flex items-center justify-between -translate-y-1/2'
        >
          <Button
            variant='ghost'
            size='icon'
            className='text-white hover:bg-white/20 backdrop-blur-sm'
            onClick={handlePrev}
            disabled={isTransitioning}
          >
            <ChevronLeft className='h-8 w-8' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='text-white hover:bg-white/20 backdrop-blur-sm'
            onClick={handleNext}
            disabled={isTransitioning}
          >
            <ChevronRight className='h-8 w-8' />
          </Button>
        </motion.div>

        {/* Volume Control */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='absolute bottom-4 right-4 flex justify-end z-10'
        >
          <Button
            variant='ghost'
            size='icon'
            className='text-white hover:bg-white/20 hover:text-white backdrop-blur-sm'
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className='h-6 w-6' />
            ) : (
              <Volume2 className='h-6 w-6' />
            )}
          </Button>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentMovie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className='absolute bottom-0 left-0 p-8 space-y-4 w-full'
          >
            <div className='space-y-1'>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className='text-sm text-purple-400'
              >
                {currentMovie.categories.join(" ")}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className='text-5xl font-bold'
              >
                {currentMovie.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className='flex items-center gap-4 text-sm text-gray-300'
              >
                <span>{currentMovie.rating}</span>
                <span>{currentMovie.year}</span>
                <span>{currentMovie.duration}</span>
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className='max-w-xl text-gray-300'
            >
              {currentMovie.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className='flex gap-4'
            >
              <Button
                className='bg-purple-600 hover:bg-purple-700'
                onClick={handlePlayNow}
              >
                <Play className='w-4 h-4 mr-2' />
                Play Now
              </Button>
              <Button
                variant='outline'
                className='text-purple-600'
                onClick={handleWatchLater}
              >
                <Plus className='w-4 h-4 mr-2' />
                Watch Later
              </Button>
            </motion.div>

            {/* Progress Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className='flex gap-2 mt-4 w-[calc(100%-2rem)] items-center'
            >
              {movies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleSlideChange(index);
                  }}
                  className='relative h-1 rounded-full overflow-hidden hover:h-2 transition-all cursor-pointer'
                  style={{
                    width:
                      index === currentSlide
                        ? "100%"
                        : `calc(100% / ${movies.length})`,
                  }}
                >
                  <div className='absolute inset-0 bg-gray-600' />
                  {index === currentSlide && (
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                      transition={{
                        duration:
                          movies[currentSlide]?.slider_duration / 1000 || 10,
                        ease: "linear",
                        repeat: 0,
                      }}
                      className='absolute inset-0 bg-purple-600'
                    />
                  )}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
