import "../css/SearchSuggestions.css";

function SearchSuggestions({ suggestions, onSelectSuggestion, loading }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="suggestions-dropdown">
      {loading ? (
        <div className="suggestion-item loading">Loading suggestions...</div>
      ) : (
        suggestions.map((movie) => (
          <div
            key={movie.id}
            className="suggestion-item"
            onClick={() => onSelectSuggestion(movie.title)}
          >
            <span className="movie-title">{movie.title}</span>
            <span className="movie-year">
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default SearchSuggestions;
