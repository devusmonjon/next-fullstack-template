import MovieCard from "./movie-card"
import Link from "next/link"

export default function NewReleases() {
  const movies = [
    {
      title: "Man in The Black",
      image: "/placeholder.svg",
      year: "2021",
      duration: "1 hr 45 mins",
      rating: "TV-MA",
      categories: ["Action", "Adventure"],
    },
    {
      title: "City Hunter",
      image: "/placeholder.svg",
      year: "2016",
      duration: "1 hr 55 mins",
      rating: "TV-MA",
      categories: ["Action", "Romance"],
    },
    {
      title: "My Faithful Dog",
      image: "/placeholder.svg",
      year: "2022",
      duration: "1 hr 25 mins",
      rating: "TV-MA",
      categories: ["Adventure", "History"],
    },
    {
      title: "Warlock of Dusk",
      image: "/placeholder.svg",
      year: "2019",
      duration: "2 hr 35 mins",
      rating: "TV-MA",
      categories: ["Horror", "Thriller"],
    },
  ]

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">New Release</h2>
        <Link href="#" className="text-sm text-purple-400 hover:text-purple-300">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie, index) => (
          <MovieCard
          trailerUrl="/trailers/trailer.mp4"
            key={index}
            title={movie.title}
            imageId={index}
            year={movie.year}
            duration={movie.duration}
            rating={movie.rating}
            categories={movie.categories}
            description={movie.title}
          />
        ))}
      </div>
    </section>
  )
}

