package com.example.MovieReview.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter

public class RecentReviewDTO {
	
	public RecentReviewDTO(String movieName, String username, int rating, String reviewedAt) {
		super();
		this.movieName = movieName;
		this.username = username;
		this.rating = rating;
		this.reviewedAt = reviewedAt;
	}
	private String movieName;
	private String username;
	private int rating;
	private String reviewedAt;
	

}
