// src/components/SearchBar.tsx
import React, { useState } from "react";
import type { OMDBMovie } from "../types";
import { omdbAPI } from "../services/omdb";
import { movieAPI } from "../services/api";
import { toast } from "react-toastify";
import { ToastContainer, Bounce, Zoom, Slide, Flip } from "react-toastify";

interface SearchBarProps {
  onMovieSelect: (movie: OMDBMovie) => void;
}

function SearchBar({ onMovieSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<OMDBMovie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()){
     toast.error("Please enter movie name",{
       theme: "colored",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Flip,
        progress: undefined,
     })
      return
    }

    setIsSearching(true);
    try {
      const omdbResults = await omdbAPI.searchMovies(query); // from here we are fetching the movie from OMDBAPI
      const uniqueResults = Array.from(
        new Map(omdbResults.map((m) => [m.imdbID, m])).values()
      ); //here using map which will remove duplicates in javascript and again convereted into array fromat using array.form
      setResults(uniqueResults);

      // Also search in our database
      const localResults = await movieAPI.searchMovies(query);
      // You might want to combine or handle these results differently
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleImportMovie = async (omdbMovie: OMDBMovie) => {
    try {
      // Get full details from OMDB
      const details = await omdbAPI.getMovieDetails(omdbMovie.imdbID);

      // Convert to our Movie format
      const movieToSave = {
        movieName: details.Title,
        releaseYear: details.Year,
        genre: details.Genre,
        description: details.Plot,
        posterUrl: details.Poster,
      };

      // Save to our backend
      const savedMovie = await movieAPI.savemovie(movieToSave);
      toast.success(`🎉 "${details.Title}" Stored successfully!`, {
        theme: "colored",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Flip,
        progress: undefined,
      });

      // Notify parent component
      onMovieSelect(omdbMovie);

      // Clear results
      // setResults([]); // here i have commented this because after importing data the results becomes empty
      // setQuery('');
    } catch (error) {
      console.error("Error importing movie:", error);
      toast.error("❌ Failed to store Movie. Please try again.", {
        theme: "colored",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Flip,
        progress: undefined,
      });
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="search-input"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="search-button"
          title={isSearching ? "Searching..." : "Search"}
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

      {results.length > 0 && (
        <div className="search-results">
          <h3>Search Results</h3>
          <div className="results-grid">
            {results.map((movie) => (
              <div key={movie.imdbID} className="result-card">
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "/placeholder-poster.jpg"
                  }
                  title={movie.Title}
                  alt={movie.Title}
                  className="result-poster"
                />
                <div className="result-info">
                  <h4>
                    {movie.Title} ({movie.Year})
                  </h4>
                  <button
                    onClick={() => handleImportMovie(movie)}
                    className="import-button"
                    title="Click to Import"
                  >
                    Import to Database
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
