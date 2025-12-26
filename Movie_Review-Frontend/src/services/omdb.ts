import type { OMDBMovie } from "../types";

const OMDB_API_KEY = '1f7c42df'; // You'll need to get this from omdbapi.com
const OMDB_BASE_URL = 'http://www.omdbapi.com/'   //https://www.omdbapi.com/';
export const omdbAPI = {
  // Search movies by title
  searchMovies: async (title: string): Promise<OMDBMovie[]> => {
    const response = await fetch(
      `${OMDB_BASE_URL}?s=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`
    );
    const data = await response.json();
    return data.Search || [];
  },

  // Get movie details by IMDB ID
  getMovieDetails: async (imdbID: string): Promise<OMDBMovie> => {
    const response = await fetch(
      `${OMDB_BASE_URL}?i=${imdbID}&apikey=${OMDB_API_KEY}`
    );
    return response.json();
  },
};