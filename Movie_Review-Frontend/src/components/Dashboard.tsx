// src/Dashboard.js
import { Link } from "react-router-dom";
import "../Styles/Dashboard.css";
import ThemeToggleButton from "../ThemeChange/ThemeToggleButton";
import StatisticsCards from "../DashBoardItems/StatisticsCards";
import RecentReviews from "../DashBoardItems/RecentReviews";
import TopReviewers from "../DashBoardItems/TopReviewers";

function Dashboard() {
  return (
    <div className="dashboard">
      {/* Header/Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="logo">Movie Reviews</h1>
          <div className="nav-buttons">
            <Link to="/login">
              <button className="nav-button" title="Click to Login">Login</button>
            </Link>
            <Link to="/register">
              <button className="nav-button" title="Click to Register">Register</button>
            </Link>
            <ThemeToggleButton />
          </div>
        </div>
      </nav>

     
      <div className="dashboard-content">
        <div className="main-content1">
          <h2 className="title_dashboard">Welcome to MovieReviews</h2>
        </div>
      </div>
      <TopReviewers/>
      <aside className="stats-sidebar">
        <div className="grid">
          <StatisticsCards />
        </div>
        <div className="recent-grid">
          <RecentReviews/>
        </div>
      </aside>
    </div>
  );
}

export default Dashboard;
