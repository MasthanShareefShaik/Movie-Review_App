import type { Movie, Review, statistics } from "../types";

const BaseApi = "http://localhost:9090";

export const movieAPI = {
  getMovies: async (): Promise<Movie[]> => {
    const res = await fetch(`${BaseApi}/movie/all`,{
      credentials: 'include',
    });
    return res.json();
  },
  getMovieById: async (id: number): Promise<Movie> => {
    const response = await fetch(`${BaseApi}/movie/id/${id}`,{
       credentials: 'include',
    });
    
    return response.json();
  },
  getStatistics:async():Promise<statistics>=>{
    const response = await fetch(`${BaseApi}/movie/statistics` ,{
      credentials:'include',
    })
    return response.json()

  },

  searchMovies: async (title: string): Promise<Movie> => {
    const res = await fetch(`${BaseApi}/movie/title/${title}`,{
       credentials: 'include',
    });
    return res.json();
  },
  savemovie: async (movie: Movie): Promise<Movie> => {
    const response = await fetch(`${BaseApi}/movie/save`, {
      method: "POST",
       credentials: 'include',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    return response.json();
  },
};

export const reviewAPI = {
  // Get reviews for a movie
  getReviews: async (movieId: number): Promise<Review[]> => {
    const response = await fetch(`${BaseApi}/review/id/${movieId}`,{
       credentials: 'include',
    });
    return response.json();
  },
  // Save a review
  saveReview: async (movieId: number, review: Review): Promise<Review> => {
    const response = await fetch(`${BaseApi}/review/save/${movieId}`, {
      method: "POST",
       credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    return response.json();
  },
  
};
