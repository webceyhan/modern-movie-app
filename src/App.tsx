import { useEffect, useState } from "react";
import { fetchMovies, type Movie } from "./api";
import Search from "./components/Search";

export default function App() {
  //
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState<Movie[]>([]);

  const loadMovies = async () => {
    // Reset error message
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await fetchMovies();
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

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading && <p className="text-white">Loading...</p>}

          {errorMessage && <p className="error">{errorMessage}</p>}

          <ul className="text-white">
            {movieList.map((movie) => (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
