import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { fetchMovies, type Movie } from "./api";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import {
  getTrendingMovies,
  updateSearchCount,
  type TrendingMovie,
} from "./appwrite";

export default function App() {
  //
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovie[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce the search term to avoid too many API calls
  // This will update debouncedSearchTerm after 500ms of inactivity
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const loadMovies = async () => {
    // Reset error message
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await fetchMovies(debouncedSearchTerm);
      setMovieList(data.results);

      // If the search term is not empty and no results are found,
      // update the search count in Appwrite to track searches
      // which will help in improving the search experience
      if (debouncedSearchTerm && data.results.length > 0) {
        await updateSearchCount(debouncedSearchTerm, data.results[0]);
      }
    } catch (error) {
      setMovieList([]);
      setErrorMessage("Failed to fetch movies.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const data = await getTrendingMovies();
      setTrendingMovies(data);
    } catch (error) {
      setTrendingMovies([]);
      setErrorMessage("Failed to fetch trending movies.");
    }
  };

  useEffect(() => {
    // Load movies when the component mounts
    loadMovies();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    // Load trending movies when the component mounts
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />

          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.searchTerm} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>

          {isLoading && <Spinner />}

          {errorMessage && <p className="error">{errorMessage}</p>}

          <ul className="text-white">
            {movieList.map((movie) => (
              <li key={movie.id}>
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
