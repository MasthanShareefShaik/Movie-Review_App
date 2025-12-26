import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import '../Styles/Header.css'
import usericon from '../assets/usericon.png'; 
import axios from "axios";
import ThemeToggleButton from "../ThemeChange/ThemeToggleButton";

function Header() {

  const [currentuser,setCurrentUser]= useState("")
  const navigate = useNavigate()
  const location = useLocation(); 
  
  const handlenavigation = ()=>{
      navigate('/logout')
      
  }
  const handlechangepassword = ()=>{
    console.log("First front end change");
    navigate('/changePassword',{
      state:{from:location.pathname}
    })
  }

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
    <>
      <header className="header">
      <div className="header-container">
        <div className="left-content">
          <h1 className="logo">MovieReview</h1>
          <p className="tagline">Discover and review your favorite movies</p>
        </div>
        <div className="right-content">
          <div className="profile">
          <img src={usericon} alt="User Icon" title="user" className="profile-icon" />
              <span className="username" title={currentuser.toUpperCase()} >{currentuser.toUpperCase()}</span>
          </div>
          <button onClick={handlechangepassword} title="change password" className="change-password-button">ChangePassword</button>
          <button onClick={handlenavigation} title="logout" className="logout-button">Logout</button>
         <ThemeToggleButton/>
          
        </div>
      </div>
    </header>
    </>
  );
}
export default Header;
