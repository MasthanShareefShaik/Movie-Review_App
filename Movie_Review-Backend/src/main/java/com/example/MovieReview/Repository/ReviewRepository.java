package com.example.MovieReview.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.MovieReview.DTO.TopReviewerDTO;
import com.example.MovieReview.Entity.Review;
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
   
	List<Review>findByMovieId(Long id);//it will give all the reviews (in form of entities ) for that specified movie_id
	  @Query("SELECT new com.example.MovieReview.DTO.TopReviewerDTO(r.currentuser, COUNT(r), AVG(r.rating)) " + //here we creating object to topreviewDTO and supplying data through arguments
	           "FROM Review r GROUP BY r.currentuser ORDER BY COUNT(r) DESC") // by above query search all users and there count of review given and as we know there is AVG it will do avg of all rating that user provided
	    List<TopReviewerDTO> findTopReviewers();
}
