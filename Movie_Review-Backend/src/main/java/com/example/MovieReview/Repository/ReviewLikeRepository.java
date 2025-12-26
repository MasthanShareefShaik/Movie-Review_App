package com.example.MovieReview.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MovieReview.Entity.ReviewLike;
@Repository

public interface ReviewLikeRepository extends JpaRepository<ReviewLike, Integer> {
	  long countByReviewReviewId(Long reviewId);

	    Optional<ReviewLike> findByReviewReviewIdAndUsername(Long reviewId, String username);

}
