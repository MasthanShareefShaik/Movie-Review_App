import axios from "axios";
import { useEffect, useState } from "react";
import '../Styles/TopReviewers.css'
interface TopReviewers{
    username:string,
    reviewCount:number,
    averageRating:number
}
function TopReviewers() {
  const [topreviewers, setTopReviewers] = useState<TopReviewers[]>([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const fecthTopReviewers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:9090/review/top-reviewers",
          {
            withCredentials: true,
          }
        );
        setTopReviewers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching top reviewers:", error);
        setIsLoading(false);
      }
    };

    fecthTopReviewers();
  }, []);
    if (isloading) return <p>Loading leaderboard...</p>;
  return (
     <div className="leaderboard-container">
      <h2 className="topreviewers-title">🏆 Top Reviewers</h2>
      <ul className="leaderboard-list">
        {topreviewers.map((reviewer, index) => (
          <li key={index} className="leaderboard-item">
            <span className="rank">#{index + 1}</span>
            <span className="user">👤 {reviewer.username}</span>
            <span className="stats">
              Reviews: {reviewer.reviewCount} | Avg: {reviewer.averageRating.toFixed(1)} <span style={{ fontSize: '24px' }}>✪</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TopReviewers;
