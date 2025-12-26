import { useEffect, useState } from "react";
import type { statistics } from "../types";
import { Bounce, toast } from "react-toastify";
import '../Styles/StatisticsCards.css'
import { movieAPI } from "../services/api";
function StatisticsCards(){
    const[data,setData] = useState<statistics|null>(null)
    const [error, setError] = useState<boolean>(false); 
    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await movieAPI.getStatistics().then(res=>setData(res))
  
        } catch (error) {
            console.error("Error fetching statistics:", error);
             setError(true);
        }
    };

    fetchData();
}, []);
 // Show toast inside useEffect when error state is updated
    useEffect(() => {
        if (error) {
            toast.error("Unable to fetch statistics data", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Bounce,
                progress: undefined,
            });
        }
    }, [error]);
      if (!data) {
        return <div>Loading statistics...</div>; ; // Don't render anything if data is not available
    }
    return(
        <>
          <div className="static-grid">
      <div className="static-card">Total Reviews: {data.totalReviews}</div>
      <div className="static-card">  Avg Rating: {(data.avgRating ?? 0).toFixed(2)}</div>
      <div className="static-card">Registered Users: {data.totalUsers}</div>
      <div className="static-card">Most Reviewed Movie: {data.mostReviewed}</div>
    </div>
        </>
    )
}
export default StatisticsCards;