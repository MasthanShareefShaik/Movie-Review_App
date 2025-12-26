import axios from "axios";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify/unstyled";

function LogOut(){

   const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post('http://localhost:9090/logout', null, {
          withCredentials: true, 
        });

   sessionStorage.removeItem("hasSeenPopup");
   toast.success('Logout was successful',{
      position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
        progress: undefined,
   })
        navigate('/'); // or navigate to DashboardPage
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
    logout();
  }, [navigate]);
  return null;
}
export default LogOut;