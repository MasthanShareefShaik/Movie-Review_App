import { type Review } from "../types";
import { reviewAPI } from "../services/api";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewLikeItem from "./ReviewLikeItem";

interface ReviewListProps {
  movieId: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ movieId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const[logineduser,setLogineduser]=useState('')
  useEffect(() => {
    loadReviews();
  }, [movieId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewAPI.getReviews(movieId);
      console.log(data);

      setReviews(data);
    } catch (err) {
      setError("Failed to load reviews");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0); // here intial value 0 and we are indicating the we have to done sum and reviews rating are sumedSo, for example, if reviews = [{ rating: 4 }, { rating: 5 }, { rating: 3 }], this will compute:total = 0 + 4 + 5 + 3 = 12

    return (total / reviews.length).toFixed(1); //.toFixed(1) formats it to one decimal place, as a string. it is returning string
  };
  const renderStars = (average: number) => {
    const fullStars = Math.floor(average);
    const halfStar = average - fullStars >= 0.5;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} style={{ color: "#e5351aff" }}>
            ★
          </span>
        );
      } else if (i === fullStars + 1 && halfStar) {
        stars.push(
          <span key={i} style={{ color: "#e5351aff" }}>
            ☆
          </span>
        );
      } else {
        stars.push(
          <span key={i} style={{ color: "#e4e5e9" }}>
            ★
          </span>
        );
      }
    }

    return <span className="stars">{stars}</span>;
  };
  const getcurrentuser = async () => {
  try {
    const response = await axios.get("http://localhost:9090/getuser",{
      withCredentials:true
    });
    setLogineduser(response.data);
    console.log("Current user:", response.data);
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
};
  useEffect(()=>{
    getcurrentuser()
  },[])
 
  if (loading) return <div className="loading">Loading reviews...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="review-list">
      <div className="rating-summary">
        <h4>Reviews ({reviews.length})</h4>
        {reviews.length > 0 && (
          <div className="average-rating">
            <span>Average Rating: </span>
            {renderStars(Number(calculateAverageRating()))}
            {/* in above used Number which is used to convert string to number */}
          </div>
        )}
      </div>

 {reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet. Be the first to review!</p>
      ) : (
        <div className={`reviews ${reviews.length > 2 ? "scrollable" : ""}`}>
          {reviews.map((review) => (
            <div key={review.reviewId} className="review-item">
              <div className="review-header">
                <span className="reviewer">{review.currentuser}</span>
                <span className="rating">Rating: {review.rating}/5</span>
                <span className="review-date">
                  {new Date(review.createdAt!).toLocaleDateString()}
                </span>
              </div>
              <p className="comment">
                {review.comment}{" "}
                <ReviewLikeItem
                  reviewId={review.reviewId}
                  loginedUser={logineduser}
                />
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
