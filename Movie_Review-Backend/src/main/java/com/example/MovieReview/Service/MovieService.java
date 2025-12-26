package com.example.MovieReview.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MovieReview.Entity.Movie;
import com.example.MovieReview.Entity.Review;
import com.example.MovieReview.Repository.MovieRepository;
import com.example.MovieReview.Repository.ReviewRepository;
import com.example.MovieReview.Repository.UserRepository;

@Service
public class MovieService {

	@Autowired
	private MovieRepository movieRepository;
	@Autowired
	private ReviewRepository reviewRepository;
	@Autowired
	private UserRepository userRepository;

	public Movie savemovie(Movie movie) {
		return movieRepository.save(movie);
	}

	public Optional<Movie> findByid(Long id){

		return movieRepository.findById(id);
	}

	public List<Movie>getMovieByTitile(String title){
		if(title!=null&& !title.isEmpty()) {
			return movieRepository.findByMovieNameContainingIgnoreCase(title);
		}
		return movieRepository.findAll();

	}
	public List<Movie> getallMovies(){
		return movieRepository.findAll();
	}
	public Map<String, Object>getstatistics(){

		long totalReviews = reviewRepository.count();
		double avgRating = 0.0;
		long totalUsers = userRepository.count();
		Movie mostReviewed = movieRepository.findAll()
				.stream()
				.max(Comparator.comparing(m -> reviewRepository.findByMovieId(m.getId()).size()))
				.orElse(null);
		if (mostReviewed != null) {
	        List<Review> reviewsForMostReviewed = reviewRepository.findByMovieId(mostReviewed.getId());
	        avgRating = reviewsForMostReviewed.stream()
	                .mapToInt(Review::getRating)
	                .average()
	                .orElse(0.0);
	    }
		 Map<String, Object> stats = new HashMap<>();
	        stats.put("totalReviews", totalReviews);
	        stats.put("avgRating", avgRating);
	        stats.put("totalUsers", totalUsers);
	        stats.put("mostReviewed", mostReviewed != null ? mostReviewed.getMovieName() : null);

	        return stats;
	}

}
