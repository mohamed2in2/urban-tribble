import MovieCard from "./MovieCard";

function MovieGrid({ movies, onMovieClick }) {
  if (movies.length === 0) {
    return (
      <div className="no-results">
        <p>No matches yet. Try a different search or clear the filters.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  );
}

export default MovieGrid;
