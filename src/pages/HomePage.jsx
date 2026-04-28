import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";

function HomePage({
  query,
  setQuery,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  filteredMovies,
  availableGenres,
  tmdbEnabled,
  isLoading,
  error,
}) {
  const navigate = useNavigate();
  const spotlightMovies = filteredMovies.slice(0, 3);

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <main className="container">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">MovieApp KC</p>
          <h1>A small movie shelf built for real browsing.</h1>
          <p className="hero-text">
            Search by mood, sort by instinct, and open a title when it feels right. Each movie comes
            with the basics, a trailer, and quick paths to watch or read more.
          </p>
          <div className="hero-chips">
            <span>Hand-picked feel</span>
            <span>Fast search</span>
            <span>Trailer previews</span>
          </div>
        </div>

        <aside className="hero-card">
          <p className="hero-card-label">Today’s shelf note</p>
          <h2>Built like a list a person would actually keep.</h2>
          <p>
            No clutter, no pretending. Just a clean way to move from a poster to a trailer to a real
            decision about what to watch.
          </p>
        </aside>
      </section>

      <section className="spotlight-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Spotlight</p>
            <h2>Three titles worth opening first.</h2>
          </div>
          <p>These follow the current sort and search state, so the shelf always feels alive.</p>
        </div>

        <div className="spotlight-grid">
          {spotlightMovies.map((movie) => (
            <button key={movie.id} className="spotlight-card" onClick={() => handleMovieClick(movie)}>
              <img src={movie.poster} alt={movie.title} />
              <div>
                <h3>{movie.title}</h3>
                <p>
                  {movie.year} · {movie.genre.slice(0, 2).join(" / ")}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="controls">
        <SearchBar onSearch={setQuery} />
        <div className="filters">
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort movies"
          >
            <option value="rating">Sort by Rating</option>
            <option value="year">Sort by Year</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      <div className="genre-filters">
        {availableGenres.map((genre) => (
          <button
            key={genre}
            className={`genre-btn${selectedGenre === genre ? " active" : ""}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <p className="results-count">
        {filteredMovies.length} movie{filteredMovies.length !== 1 ? "s" : ""} found
        {query ? ` for "${query}"` : ""}
        {selectedGenre !== "All" ? ` in ${selectedGenre}` : ""}
      </p>

      {tmdbEnabled && isLoading ? <p className="results-count">Loading movies...</p> : null}
      {error ? <p className="results-count">{error}</p> : null}

      <MovieGrid movies={filteredMovies} onMovieClick={handleMovieClick} />
    </main>
  );
}

export default HomePage;
