import MovieCard from "../components/MovieCard";
import SearchSuggestions from "../components/SearchSuggestions";
import { useState, useEffect, useRef } from "react";
import { searchMovies, getPopularMovies } from "../../services/api";

import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimer = useRef(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        setSuggestionsLoading(true);
        const results = await searchMovies(query);
        setSuggestions(results.slice(0, 8));
        setShowSuggestions(true);
      } catch (err) {
        console.log(err);
        setSuggestions([]);
      } finally {
        setSuggestionsLoading(false);
      }
    }, 300);
  };

  const handleSelectSuggestion = (movieTitle) => {
    setSearchQuery(movieTitle);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
      setShowSuggestions(false);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies..");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="search-form-wrapper">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies...."
            className="search-input"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        {showSuggestions && (
          <SearchSuggestions
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
            loading={suggestionsLoading}
          />
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading..</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
