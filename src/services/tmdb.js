const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

const sortMap = {
  rating: "vote_average.desc",
  year: "primary_release_date.desc",
  title: "title.asc",
};

async function tmdbRequest(path, params = {}) {
  if (!tmdbApiKey) {
    throw new Error("Missing VITE_TMDB_API_KEY");
  }

  const search = new URLSearchParams({
    api_key: tmdbApiKey,
    language: "en-US",
    ...params,
  });

  const response = await fetch(`${TMDB_BASE_URL}${path}?${search.toString()}`);
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}

function getPosterUrl(path) {
  if (!path) return "https://via.placeholder.com/300x450?text=No+Image";
  return `${TMDB_IMAGE_BASE_URL}${path}`;
}

function parseYear(releaseDate) {
  if (!releaseDate) return "N/A";
  return Number(releaseDate.slice(0, 4));
}

function createAmazonUrl(title) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(title)}&i=instant-video`;
}

function createImdbSearchUrl(title) {
  return `https://www.imdb.com/find/?q=${encodeURIComponent(title)}`;
}

function createTrailerSearchUrl(title) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}+official+trailer`;
}

export function hasTmdbApiKey() {
  return Boolean(tmdbApiKey);
}

export async function fetchTmdbGenres() {
  const data = await tmdbRequest("/genre/movie/list");
  return data.genres || [];
}

function toAppMovie(movie, genreNames = []) {
  const title = movie.title || "Untitled";

  return {
    id: movie.id,
    title,
    year: parseYear(movie.release_date),
    rating: Number((movie.vote_average || 0).toFixed(1)),
    genre: genreNames,
    poster: getPosterUrl(movie.poster_path),
    overview: movie.overview || "No overview available.",
    director: "Unknown",
    runtime: movie.runtime || 0,
    amazonUrl: createAmazonUrl(title),
    imdbUrl: createImdbSearchUrl(title),
    trailerUrl: createTrailerSearchUrl(title),
    trailerEmbedUrl: "",
  };
}

export async function fetchTmdbMovies({ query, selectedGenreId, sortBy, genreMap }) {
  const params = {
    include_adult: "false",
    page: "1",
  };

  let endpoint = "/discover/movie";

  if (query) {
    endpoint = "/search/movie";
    params.query = query;
  } else {
    params.sort_by = sortMap[sortBy] || sortMap.rating;
    params.vote_count_gte = "200";
  }

  if (selectedGenreId) {
    params.with_genres = String(selectedGenreId);
  }

  const data = await tmdbRequest(endpoint, params);
  const results = data.results || [];

  return results.map((movie) => {
    const genreNames = (movie.genre_ids || []).map((id) => genreMap[id]).filter(Boolean);
    return toAppMovie(movie, genreNames);
  });
}

export async function fetchTmdbMovieDetails(movieId) {
  const data = await tmdbRequest(`/movie/${movieId}`, {
    append_to_response: "credits,external_ids,videos",
  });

  const director = data.credits?.crew?.find((crewMember) => crewMember.job === "Director")?.name || "Unknown";
  const genreNames = (data.genres || []).map((item) => item.name);
  const imdbUrl = data.external_ids?.imdb_id
    ? `https://www.imdb.com/title/${data.external_ids.imdb_id}`
    : createImdbSearchUrl(data.title || "");
  const trailer = data.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );
  const trailerEmbedUrl = trailer?.key ? `https://www.youtube.com/embed/${trailer.key}` : "";
  const trailerUrl = trailer?.key
    ? `https://www.youtube.com/watch?v=${trailer.key}`
    : createTrailerSearchUrl(data.title || "");

  return {
    ...toAppMovie(data, genreNames),
    director,
    runtime: data.runtime || 0,
    imdbUrl,
    trailerUrl,
    trailerEmbedUrl,
  };
}
