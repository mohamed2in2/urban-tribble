import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import { mockMovies } from "../data/mockMovies";
import { fetchTmdbMovieDetails } from "../services/tmdb";

function MoviePage({ tmdbEnabled, movies }) {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const id = Number(movieId);

    const localMovie = movies.find((item) => item.id === id) || mockMovies.find((item) => item.id === id) || null;

    if (!tmdbEnabled) {
      setMovie(localMovie);
      return;
    }

    const loadDetails = async () => {
      setIsLoading(true);
      try {
        const details = await fetchTmdbMovieDetails(id);
        if (!cancelled) {
          setMovie(details);
        }
      } catch {
        if (!cancelled) {
          setMovie(localMovie);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadDetails();

    return () => {
      cancelled = true;
    };
  }, [movieId, tmdbEnabled, movies]);

  if (isLoading && !movie) {
    return (
      <main className="container">
        <p className="results-count">Loading the movie page...</p>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="container">
        <div className="no-results">
          <p>That title is not in the shelf right now.</p>
          <button className="back-btn" onClick={() => navigate("/")}>Back to the shelf</button>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <MovieDetail movie={movie} onBack={() => navigate("/")} />
    </main>
  );
}

export default MoviePage;
