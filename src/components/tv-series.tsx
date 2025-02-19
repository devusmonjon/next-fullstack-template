"use client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Eye, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Show {
  id: number
  title: string
  image: string
  year: string
  seasons: string
  description: string
  size?: "large" | "regular"
}

export default function TVSeries() {
  const { toast } = useToast()

  const shows: Show[] = [
    {
      id: 1,
      title: "Date Night",
      image: "https://picsum.photos/seed/date-night/800/600",
      year: "2023",
      seasons: "2 Seasons",
      description: "Celebrity interviews, trending entertainment stories, and expert analysis",
      size: "large",
    },
    {
      id: 2,
      title: "Crime Stories",
      image: "https://picsum.photos/seed/crime/800/600",
      year: "2023",
      seasons: "1 Season",
      description: "Explore the dark side of human nature through true crime stories",
    },
    {
      id: 3,
      title: "Arcane",
      image: "https://picsum.photos/seed/arcane/800/600",
      year: "2021",
      seasons: "2 Seasons",
      description: "From the creators of League of Legends comes an animated series",
    },
    {
      id: 4,
      title: "Escape to the Farm",
      image: "https://picsum.photos/seed/farm/800/600",
      year: "2020",
      seasons: "1 Season",
      description: "Experience the peaceful life on a traditional farm",
    },
  ]

  const handleViewDetail = (show: Show) => {
    toast({
      title: `Opening ${show.title}`,
      description: show.description,
    })
  }

  const handleWatchLater = (show: Show) => {
    toast({
      title: "Added to Watch Later",
      description: `${show.title} has been added to your list`,
    })
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recommended TV Shows</h2>
        <div className="flex gap-4">
          <Button variant="link" className="text-purple-400">
            Today
          </Button>
          <Button variant="link" className="text-gray-400">
            This week
          </Button>
          <Button variant="link" className="text-gray-400">
            This month
          </Button>
          <Button variant="link" className="text-gray-400">
            Last 3 months
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shows.map((show) => (
          <div
            key={show.id}
            className={`group relative rounded-lg overflow-hidden ${show.size === "large" ? "lg:col-span-2" : ""}`}
          >
            <div className="relative aspect-video">
              <Image
                src={show.image || "/placeholder.svg"}
                alt={show.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                <div>
                  <h3 className="text-xl font-semibold">{show.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>{show.year}</span>
                    <span>•</span>
                    <span>{show.seasons}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-300 line-clamp-2">{show.description}</p>

                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleViewDetail(show)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Detail
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white text-white hover:bg-white/20"
                    onClick={() => handleWatchLater(show)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Watch Later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

