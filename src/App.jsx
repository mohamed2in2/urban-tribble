import { useState, useMemo } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import MovieDetail from "./components/MovieDetail";
import { mockMovies, genres } from "./data/mockMovies";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortBy, setSortBy] = useState("rating");

  const filteredMovies = useMemo(() => {
    let result = mockMovies;

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.genre.some((g) => g.toLowerCase().includes(q))
      );
    }

    if (selectedGenre !== "All") {
      result = result.filter((m) => m.genre.includes(selectedGenre));
    }

    result = [...result].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return b.year - a.year;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

    return result;
  }, [query, selectedGenre, sortBy]);

  const handleLogoClick = () => {
    setSelectedMovie(null);
    setQuery("");
    setSelectedGenre("All");
  };

  return (
    <div className="app">
      <Header onLogoClick={handleLogoClick} />

      {selectedMovie ? (
        <main className="container">
          <MovieDetail movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
        </main>
      ) : (
        <main className="container">
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
            {genres.map((genre) => (
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

          <MovieGrid movies={filteredMovies} onMovieClick={setSelectedMovie} />
        </main>
      )}

      <footer className="footer">
        <p>🎬 MovieApp — Built with React &amp; Vite</p>
      </footer>
    </div>
  );
}

export default App;
