import HeroSection from "@/components/hero-section";
import MovieCarousel from "@/components/movie-carousel";
import MovieGrid from "@/components/movie-grid";
import { getMovieVideos, getPopularMovies, getTopRatedMovies, getTrendingMovies } from "@/lib/api";


export default async function HomePage() {
  // fetch all data
  const [trendingMovies, popularMovies, topRatedMovies] = await Promise.all([
    getTrendingMovies("week"),
    getPopularMovies(1),
    getTopRatedMovies(1)
  ]);

  // first trending movies
  const heroMovie = trendingMovies[0];
  const popularMovie = popularMovies.results;
  const topRatedMovie = topRatedMovies.results;

  let trailerKey = null;

  if (heroMovie) {
    try {
      const videos = await getMovieVideos(heroMovie.id);
      const trailer = videos.find(v => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"));
      trailerKey = trailer ? trailer.key : null;
    } catch (error) {
      console.error("Failed to fetch trailer video", error)
    }
  }
  

  return (
    <div className="space-y-12 pb-12">
      {/* hero section */}
      {heroMovie && <HeroSection movie={heroMovie} trailerKey={trailerKey} />}

      {/* content container */}
      <div className="container mx-auto px-4 space-y-12">
        {/* trending movie carousel */}
        <MovieCarousel movies={trendingMovies.slice(1, 15)} title="Trending Now" />

        {/* popular movies */}
        <MovieGrid movies={popularMovie.slice(0, 18)} title="Popular Movies" />

        {/* top rated movie */}
        <MovieCarousel movies={topRatedMovie} title="Top Rated" />
      </div>
    </div>
  )
}
