const FALLBACK_POSTER = "https://via.placeholder.com/300x450?text=No+Image";

function MovieDetail({ movie, onBack }) {
  const stars = Math.round(movie.rating / 2);

  return (
    <div className="movie-detail">
      <button className="back-btn" onClick={onBack}>
        ← Back to Movies
      </button>
      <div className="movie-detail-content">
        <div className="movie-detail-poster">
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            onError={(e) => {
              e.target.src = FALLBACK_POSTER;
            }}
          />
        </div>
        <div className="movie-detail-info">
          <h2 className="movie-detail-title">{movie.title}</h2>
          <div className="movie-detail-rating">
            <span className="stars">
              {"★".repeat(stars)}{"☆".repeat(5 - stars)}
            </span>
            <span className="rating-number">{movie.rating} / 10</span>
          </div>
          <div className="movie-detail-meta">
            <span>📅 {movie.year}</span>
            <span>⏱ {movie.runtime} min</span>
            <span>🎬 {movie.director}</span>
          </div>
          <div className="movie-detail-genres">
            {movie.genre.map((g) => (
              <span key={g} className="genre-badge">{g}</span>
            ))}
          </div>
          <p className="movie-detail-overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
