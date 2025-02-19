import Navbar from "@/components/navbar"
import HeroSlider from "@/components/hero-slider"
import TrendingMovies from "@/components/trending-movies"
import NewReleases from "@/components/new-releases"
import TVSeries from "@/components/tv-series"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSlider />
        <div className="max-w-screen-2xl mx-auto px-4 space-y-8 py-8">
          <TrendingMovies />
          <NewReleases />
          <TVSeries />
        </div>
      </main>
      <Footer />
    </div>
  )
}

