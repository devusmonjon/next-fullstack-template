import MovieCard from "./movie-card"
import Link from "next/link"

export default function TrendingMovies() {
  const movies = [
    {
      title: "John Wick 4",
      imageId: 1001,
      year: "2023",
      duration: "170 mins",
      rating: "TV-MA",
      trailerUrl: "/trailers/trailer.mp4", // Replace with actual trailer URL
    },
    {
      title: "Spider Man Memo",
      imageId: 1002,
      year: "2022",
      duration: "1 hr 25 mins",
      rating: "TV-MA",
      trailerUrl: "/trailers/trailer.mp4",
    },
    {
      title: "The White House",
      imageId: 1003,
      year: "2023",
      duration: "2 hr 35 mins",
      rating: "TV-MA",
      trailerUrl: "/trailers/trailer.mp4",
    },
    {
      title: "The Post",
      imageId: 1004,
      year: "2022",
      duration: "1 hr 25 mins",
      rating: "TV-MA",
      trailerUrl: "/trailers/trailer.mp4",
    },
    {
      title: "Wide Girl",
      imageId: 1005,
      year: "2022",
      duration: "1 hr 25 mins",
      rating: "TV-MA",
      trailerUrl: "/trailers/trailer.mp4",
    },
    {
      title: "The Good Doctor",
      imageId: 1006,
      year: "2017",
      duration: "1 hr 15 mins",
      rating: "TV-MA",
      trailerUrl: "/trailers/trailer.mp4",
    },
  ]

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Trending Movies</h2>
        <Link href="#" className="text-sm text-purple-400 hover:text-purple-300">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            imageId={movie.imageId}
            year={movie.year}
            duration={movie.duration}
            rating={movie.rating}
            trailerUrl={movie.trailerUrl}
            description={movie.title}
          />
        ))}
      </div>
    </section>
  )
}

