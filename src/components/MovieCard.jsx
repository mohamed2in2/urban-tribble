const FALLBACK_POSTER = "https://via.placeholder.com/300x450?text=No+Image";

function MovieCard({ movie, onClick }) {
  const stars = Math.round(movie.rating / 2);

  return (
    <div className="movie-card" onClick={() => onClick(movie)} role="button" tabIndex={0} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick(movie)}>
      <div className="movie-card-poster">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          onError={(e) => {
            e.target.src = FALLBACK_POSTER;
          }}
          loading="lazy"
        />
        <div className="movie-card-overlay">
          <span className="view-details">View Details</span>
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div className="movie-card-meta">
          <span className="movie-card-year">{movie.year}</span>
          <span className="movie-card-rating">
            {"★".repeat(stars)}{"☆".repeat(5 - stars)} {movie.rating}
          </span>
        </div>
        <div className="movie-card-genres">
          {movie.genre.slice(0, 2).map((g) => (
            <span key={g} className="genre-badge">{g}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
