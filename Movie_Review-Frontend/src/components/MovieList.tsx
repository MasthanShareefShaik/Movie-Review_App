import MovieCard from "./MovieCard";
import { movieAPI } from "../services/api";
import { type Movie } from "../types";

import { useEffect, useState } from "react";
function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // from app.tsx movielsit component is rendered as we know useeffect is excuted after specific component is rendered from that loadmovies() is called
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await movieAPI.getMovies();
      setMovies(data);
    } catch (err) {
      setError("Failed to load movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;
  return (
    <div className="movie-list">
      <h2>All Movies</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
export default MovieList;
