import axios from "axios";
import { useEffect, useState } from "react";
import '../Styles/ReviewLikeItem.css'
interface ReviewLikeProps{
    reviewId?:number,
    loginedUser:string
}
function ReviewLikeItem({reviewId,loginedUser}:ReviewLikeProps){
     const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

   useEffect(() => {
    fetchLikeData();
  }, [reviewId, loginedUser]);

   const fetchLikeData = async () => {
    try {
      const [countRes, likedRes] = await Promise.all([
        axios.get<number>(`http://localhost:9090/review/${reviewId}/likes/count`,{
            withCredentials:true
        }),
        axios.get<boolean>(
          `http://localhost:9090/review/${reviewId}/likes/${loginedUser}`,{
            withCredentials:true
          }
        ),
      ]);
      
      setLikeCount(countRes.data);
      setLiked(likedRes.data);
    } catch (err) {
      console.error("Failed to fetch like data", err);
    }
  };
   const toggleLike = async () => {
    try {
    await fetch(`http://localhost:9090/review/${reviewId}/like/${loginedUser}`,{
        method: "POST",
       credentials: 'include',
     })
      
      await fetchLikeData();

    } catch (err) {
      console.error("Failed to toggle like", err);
    }
  };
    return(
          <div className="like-section">
      <button className="like_button"
        onClick={toggleLike}
        style={{
          color: liked ? "red" : "gray",
          cursor: "pointer",
          background: "none",
          border: "none",
          fontSize: "25px",
          marginRight:"25px"
        }}
        // aria-label={liked ? "Unlike review" : "Like review"}
          title={liked ? "Unlike review" : "Like review"}  
      >
        ♥ 
      </button>
      <div className="like-count" >
        {likeCount} 
      </div>
    </div>
    )
}
export default ReviewLikeItem;