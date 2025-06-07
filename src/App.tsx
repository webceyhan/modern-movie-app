import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { fetchMovies, type Movie } from "./api";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

export default function App() {
  //
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState<Movie[]>([]);
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
    } catch (error) {
      setMovieList([]);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load movies when the component mounts
    loadMovies();
  }, [debouncedSearchTerm]);

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
