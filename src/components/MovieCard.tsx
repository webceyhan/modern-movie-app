import type { Movie } from "../api";

type Props = {
  movie: Movie;
};

export default function MovieCard({
  movie: { title, vote_average, poster_path, original_language, release_date },
}: Props) {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="/star.svg" alt="Rating" />
            <span>{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
          </div>

          <span>•</span>

          <p className="lang">{original_language}</p>

          <span>•</span>

          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
