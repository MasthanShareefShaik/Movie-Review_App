import { useEffect, useState } from "react";
import axios from "axios";
import '../Styles/RecentReviews.css'
import { formatDistanceToNow } from "date-fns";
interface RecentReview{
    movieName:string
    username:string
    rating:number
    reviewedAt:string
}
function RecentReviews(){
     const [reviews, setReviews] = useState<RecentReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recentReviews = async()=>{
          const response = await axios.get("http://localhost:9090/review/recent_reviews",{
        withCredentials:true,
     })
     setReviews(response.data);
     setLoading(false)
     console.log(response.data[0]);
    }
   recentReviews();

  }, []);

  if (loading) {
    return <div>Loading recent reviews...</div>;
  }
     return (
     <div className="recent-reviews">
      <h3>Recently Reviewed</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index} className="review-item">
            <strong >{review.movieName}</strong> <br />
            <span>User: {review.username}</span> <br />
            <span >Rating: {review.rating} ⭐</span> <br />
            <span>
              Reviewed:{" "}
              {review.reviewedAt                                // below addsuffix is optional but if we add means it will provide "ago" or "in" bases on the time
                ? `${formatDistanceToNow(new Date(review.reviewedAt), { addSuffix: true })}` //here "fromatdistancetonow" built in mmethod which change date to human readable format
                : "Unknown"}                                       
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default RecentReviews;