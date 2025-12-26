import { type Review } from "../types";
import { reviewAPI } from "../services/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Bounce, Zoom, Slide, Flip } from "react-toastify";
import axios from "axios";

interface ReviewFormProps {
  movieId: number;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  movieId,
  onReviewSubmitted,
}) => {
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
const [currentuser,setCurrentUser]= useState("")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 setSubmitting(true);
    setError(null);

    try {
      const review: Partial<Review> = {
        currentuser,
        rating,
        comment: comment.trim(),
      };
     if(comment==="" ){
       toast.error("Comment should not be empty!", {
        theme: "colored",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
        progress: undefined,
      });
      return
     }
      await reviewAPI.saveReview(movieId, review as Review); // It tells the compiler: “Trust me, this review object matches the Review type”,It does not change the runtime behavior — it's only for type checking and autocomplete
      toast.success("Review submitted successfully!", {
        theme: "colored",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
        progress: undefined,
      });

      // Reset form
      setRating(0);
      setComment("");
      // Notify parent
      onReviewSubmitted(); // here we have callback so that again moviecard is rendered which means the review list will also rendered
    } catch (err) {
      setError("Failed to submit review");
      console.error(err);
      toast.error("Failed to submit Review...Try Again", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
        progress: undefined,
      });
    } finally {
      setSubmitting(false);
    }
  };
   const getcurrentuser = async () => {
  try {
    const response = await axios.get("http://localhost:9090/getuser",{
      withCredentials:true
    });
    setCurrentUser(response.data);
    console.log("Current user:", response.data);
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
};
  useEffect(()=>{
    getcurrentuser()
  },[])

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h4>Add Your Review</h4>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="userName">Your Name</label>
       <h4>{currentuser}</h4>
      </div>

      <div className="form-group">
        <label htmlFor="rating">Rating (1-5)</label>
        <div className="star-rating-input">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "#e5351aff" : "#e4e5e9",
                fontSize: "24px",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="comment">Your Review</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this movie..."
          rows={4}
        />
      </div>

      <button type="submit" disabled={submitting} title={submitting? "" : "Submit Review"}  className="submit-button">
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
