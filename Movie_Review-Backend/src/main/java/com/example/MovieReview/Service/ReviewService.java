package com.example.MovieReview.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MovieReview.DTO.RecentReviewDTO;
import com.example.MovieReview.DTO.TopReviewerDTO;
import com.example.MovieReview.Entity.Review;
import com.example.MovieReview.Entity.ReviewLike;
import com.example.MovieReview.Repository.ReviewLikeRepository;
import com.example.MovieReview.Repository.ReviewRepository;

import jakarta.transaction.Transactional;

@Service
public class ReviewService {
	
	@Autowired
	private ReviewRepository repository;
	
	@Autowired
	private ReviewLikeRepository likeRepository;
	
	public List<Review> getReviewById(Long id) {
		List<Review> r1 = repository.findByMovieId(id);
		return r1 ;
				
	}
	
	public Review saveReview(Review review) {
		System.out.println("from save method");
		System.out.println(review.getComment());
		return repository.save(review);
	}
	
	public List<RecentReviewDTO>getRecentreviews(){
		return repository.findAll().stream()
				.sorted((r1,r2)-> r2.getCreatedAt().compareTo(r1.getCreatedAt()))
				.limit(3)
				.map(r-> new RecentReviewDTO(r.getMovie().getMovieName(), r.getCurrentuser(), r.getRating(), r.getCreatedAt().toString()))
				.toList();
	}
	public List<TopReviewerDTO> getTopReviewers() {
	    return repository.findTopReviewers().stream()
	            .limit(3) // Top 3 reviewers
	            .toList();
	}


@Transactional
	public boolean toggleLike(Long reviewId, String username) {
	    Optional<ReviewLike> optional = likeRepository.findByReviewReviewIdAndUsername(reviewId, username);

	    if (optional.isPresent()) {
	        likeRepository.delete(optional.get()); // Unlike
	        return false;
	    } else {
	        Review review = repository.findById(reviewId)
	            .orElseThrow(() -> new RuntimeException("Review not found"));

	        ReviewLike like = new ReviewLike();
	        like.setReview(review);
	        like.setUsername(username);

	        likeRepository.save(like); // Like
	        return true;
	    }
	}


	public long getLikeCount(Long reviewId) {
	    return likeRepository.countByReviewReviewId(reviewId);
	}

	public boolean hasUserLiked(Long reviewId, String username) {
	    return likeRepository.findByReviewReviewIdAndUsername(reviewId, username).isPresent();
	}

}
