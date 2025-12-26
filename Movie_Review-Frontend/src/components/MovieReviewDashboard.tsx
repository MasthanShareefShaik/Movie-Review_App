
import { useEffect, useState } from "react";
import Header from "./Header"; // create this if not already
import type { OMDBMovie } from "../types";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import Messages from "../Login/Messages";
function MovieReviewDashboard() {
  const [refreshMovies, setRefreshMovies] = useState(0);
 const [showPopup, setShowPopup] = useState(true);

  const handleMovieImport = (movie: OMDBMovie) => { // this method excuted after the callback . it is called when movie stored in database and we see in searcbar handle import movie() we are calling back onMovieselect so controller comes to app.tsx and called handlemovieimport()
    // Trigger a refresh of the movie list           ..//as refreshmovie state is update than movieList component is froced to rendered
    setRefreshMovies((prev: number) => prev + 1);
  };
   const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem("hasSeenPopup", "true");
  };
 useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setShowPopup(true);
    }
    else {
    setShowPopup(false);
  }
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <div className="container">
          <section className="search-section">
            <h2>Import Movies</h2>
            <SearchBar onMovieSelect={handleMovieImport} />
          </section>

          <section className="movies-section">
            <MovieList key={refreshMovies} />
          </section>
        </div>
      </main>
      {showPopup && <Messages onClose={handleClosePopup} />}
    </div>
  );
}

export default MovieReviewDashboard;
