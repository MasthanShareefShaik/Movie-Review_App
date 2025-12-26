package com.example.MovieReview.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.MovieReview.DTO.RecentReviewDTO;
import com.example.MovieReview.DTO.TopReviewerDTO;
import com.example.MovieReview.Entity.Movie;
import com.example.MovieReview.Entity.Review;
import com.example.MovieReview.Service.ReviewService;

@RestController
@RequestMapping("review")
//@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {
	
	@Autowired
	private ReviewService reviewService;
	
	
	@PostMapping("save/{id}")
	public ResponseEntity<Review>saveReview(@PathVariable Long id ,@RequestBody Review review){ // as here from review body we can supply name,rating,commet but we cannot able to supply movieoject so setting the movie manualy
		 Movie movie = new Movie();
	        movie.setId(id);// like here we are linking the movie and review means many persons can write reviews for one movie so reviews should be saved to specified movies so that here using id
	        review.setMovie(movie);
		return ResponseEntity.ok(reviewService.saveReview(review));
	}
	@GetMapping("id/{id}")
	public ResponseEntity<List<Review>>getbyID(@PathVariable Long id){
		
		return ResponseEntity.ok(reviewService.getReviewById(id));
	}
	@GetMapping("/recent_reviews")
	public ResponseEntity<List<RecentReviewDTO>> getRecentReviews(){
		return ResponseEntity.ok(reviewService.getRecentreviews());
	}
	@GetMapping("/top-reviewers")
	public ResponseEntity<List<TopReviewerDTO>> getTopReviewers() {
	    return ResponseEntity.ok(reviewService.getTopReviewers());
	}
	@PostMapping("/{reviewId}/like/{username}")
	public ResponseEntity<?> likeReview(@PathVariable Long reviewId, @PathVariable String username) {
	    boolean liked = reviewService.toggleLike(reviewId, username);
	    return ResponseEntity.ok().body("Liked: " + liked);
	}

	@GetMapping("/{reviewId}/likes/count")
	public ResponseEntity<Long> getLikeCount(@PathVariable Long reviewId) {
	    return ResponseEntity.ok(reviewService.getLikeCount(reviewId));
	}

	@GetMapping("/{reviewId}/likes/{username}")
	public ResponseEntity<Boolean> hasUserLiked(@PathVariable Long reviewId, @PathVariable String username) {
	    return ResponseEntity.ok(reviewService.hasUserLiked(reviewId, username));
	}

	

}
