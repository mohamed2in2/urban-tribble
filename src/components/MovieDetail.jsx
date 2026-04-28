const FALLBACK_POSTER = "https://via.placeholder.com/300x450?text=No+Image";

function createAmazonUrl(title) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(title)}&i=instant-video`;
}

function createImdbUrl(movie) {
  if (movie.imdbUrl) {
    return movie.imdbUrl;
  }

  return `https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`;
}

function createTrailerUrl(movie) {
  if (movie.trailerUrl) {
    return movie.trailerUrl;
  }

  return `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title)}+official+trailer`;
}

function MovieDetail({ movie, onBack }) {
  const stars = Math.round(movie.rating / 2);
  const amazonUrl = movie.amazonUrl || createAmazonUrl(movie.title);
  const imdbUrl = createImdbUrl(movie);
  const trailerUrl = createTrailerUrl(movie);
  const trailerEmbedUrl = movie.trailerEmbedUrl || "";

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
          <div className="movie-detail-actions">
            <a className="action-btn amazon" href={amazonUrl} target="_blank" rel="noreferrer">
              Watch on Prime
            </a>
            <a className="action-btn imdb" href={imdbUrl} target="_blank" rel="noreferrer">
              View on IMDb
            </a>
            <a className="action-btn trailer" href={trailerUrl} target="_blank" rel="noreferrer">
              Watch Trailer
            </a>
          </div>
          <div className="movie-trailer-section">
            <div className="movie-trailer-header">
              <h3>Trailer</h3>
              <p>A quick preview before you commit to the full thing.</p>
            </div>
            {trailerEmbedUrl ? (
              <div className="movie-trailer-frame">
                <iframe
                  src={trailerEmbedUrl}
                  title={`${movie.title} trailer`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="movie-trailer-empty">
                <p>No embedded trailer showed up for this one, so here’s a search link instead.</p>
                <a className="action-btn trailer" href={trailerUrl} target="_blank" rel="noreferrer">
                  Search Trailer
                </a>
              </div>
            )}
          </div>
          <p className="movie-detail-overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
