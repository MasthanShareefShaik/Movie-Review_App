import { useState } from "react";
import type { Movie } from "../types";
import DefaultImage from '../assets/poster-placeholder.jpg'
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

interface MovieCardProps {
  movie: Movie;
}
function MovieCard({ movie }: MovieCardProps) {
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewReloadKey, setReviewReloadKey] = useState(0);
  const handleReviewSubmitted = () => {
    console.log("second frontend change");
    
    setShowReviewForm(false);
    setShowReviews(true); // ensure reviews are visible
    setReviewReloadKey((prev) => prev + 1); 
  };
console.log(movie.posterUrl);

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={
            movie.posterUrl !== "N/A"
              ? movie.posterUrl
              : DefaultImage
          }
          title={movie.movieName}
          alt={movie.movieName}
        />
      </div>

      <div className="movie-details">
        <h3>
          {movie.movieName} ({movie.releaseYear})
        </h3>
        <p className="genre">{movie.genre}</p>
        <p className="description">{movie.description}</p>
        <div className="movie-actions">
          <button
            onClick={() => setShowReviews(!showReviews)}
            className="action-button"
            title={showReviews ? "Hide Reviews" : "Show Reviews"}
          >
            {showReviews ? "Hide Reviews" : "Show Reviews"}
          </button>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="action-button"
            title="Add Review"
          >
            Add Review
          </button>
        </div>

        {showReviewForm && (
          <ReviewForm
            movieId={movie.id!}
            onReviewSubmitted={handleReviewSubmitted}
          />
        )}

        {showReviews && (
          <ReviewList movieId={movie.id!} key={reviewReloadKey} />
        )}
      </div>
    </div>
  );
}
export default MovieCard;
// here below as the review key is updated as we called onreviewsubmitted () from reviewfrom after submitting to database
// so in this component hanflereviewsubmited invoked through that reviewreloadKey state is chaged so review list again froced to re-rendered so in that way newly added review will also visible
