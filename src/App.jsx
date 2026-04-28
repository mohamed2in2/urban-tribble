import { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import AboutPage from "./pages/AboutPage";
import { mockMovies, genres } from "./data/mockMovies";
import {
  fetchTmdbGenres,
  fetchTmdbMovies,
  hasTmdbApiKey,
} from "./services/tmdb";
import "./App.css";

function App() {
  const tmdbEnabled = hasTmdbApiKey();
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [movies, setMovies] = useState(mockMovies);
  const [availableGenres, setAvailableGenres] = useState(genres);
  const [genreIdByName, setGenreIdByName] = useState({});
  const [genreNameById, setGenreNameById] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredMovies = useMemo(() => {
    if (tmdbEnabled) {
      return movies;
    }

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
  }, [movies, query, selectedGenre, sortBy, tmdbEnabled]);

  useEffect(() => {
    if (!tmdbEnabled) {
      return;
    }

    let cancelled = false;

    const loadGenres = async () => {
      try {
        const tmdbGenres = await fetchTmdbGenres();
        if (cancelled) return;

        const byName = {};
        const byId = {};
        tmdbGenres.forEach((item) => {
          byName[item.name] = item.id;
          byId[item.id] = item.name;
        });

        setGenreIdByName(byName);
        setGenreNameById(byId);
        setAvailableGenres(["All", ...tmdbGenres.map((item) => item.name)]);
      } catch {
        if (!cancelled) {
          setError("Could not load TMDB genres. Showing local movies.");
        }
      }
    };

    loadGenres();

    return () => {
      cancelled = true;
    };
  }, [tmdbEnabled]);

  useEffect(() => {
    if (!tmdbEnabled) {
      return;
    }

    let cancelled = false;

    const loadMovies = async () => {
      setIsLoading(true);
      setError("");

      try {
        const selectedGenreId = selectedGenre === "All" ? null : genreIdByName[selectedGenre];
        const tmdbMovies = await fetchTmdbMovies({
          query,
          selectedGenreId,
          sortBy,
          genreMap: genreNameById,
        });

        if (cancelled) return;
        setMovies(tmdbMovies);
      } catch {
        if (!cancelled) {
          setError("Could not fetch TMDB movies. Showing local movies.");
          setMovies(mockMovies);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      cancelled = true;
    };
  }, [tmdbEnabled, query, selectedGenre, sortBy, genreIdByName, genreNameById]);

  const handleLogoClick = () => {
    setQuery("");
    setSelectedGenre("All");
    setSortBy("rating");
  };

  return (
    <div className="app">
      <Header onLogoClick={handleLogoClick} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              query={query}
              setQuery={setQuery}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              sortBy={sortBy}
              setSortBy={setSortBy}
              filteredMovies={filteredMovies}
              availableGenres={availableGenres}
              tmdbEnabled={tmdbEnabled}
              isLoading={isLoading}
              error={error}
            />
          }
        />
        <Route path="/movie/:movieId" element={<MoviePage tmdbEnabled={tmdbEnabled} movies={movies} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="*"
          element={
            <main className="container">
              <div className="no-results">
                <p>Page not found.</p>
              </div>
            </main>
          }
        />
      </Routes>

      <footer className="footer">
        <div className="footer-grid">
          <section className="footer-block">
            <h3>MovieApp KC</h3>
            <p>A small movie shelf made to feel useful, calm, and a little more personal than a plain list.</p>
          </section>

          <section className="footer-block">
            <h3>Credits</h3>
            <p>Project build: MovieApp KC</p>
            <p>Movie data: TMDB API plus a local fallback set</p>
            <p>Links: Amazon Prime Video, IMDb, and YouTube trailer previews</p>
          </section>

          <section className="footer-block">
            <h3>Contact</h3>
            <p>Email: ahmedehab2n5@gmail.com</p>
            <p>Phone: +201101670389</p>
          </section>

          <section className="footer-block footer-copy">
            <p>© 2026 MovieApp KC. All rights reserved.</p>
            <p>Made with React, Vite, and TMDB.</p>
          </section>
        </div>
      </footer>
    </div>
  );
}

export default App;
