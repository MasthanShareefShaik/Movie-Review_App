package com.example.MovieReview.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TopReviewerDTO {

	public TopReviewerDTO(String username, long reviewCount, double averageRating) {
		this.username = username;
		this.reviewCount = reviewCount;
		this.averageRating = averageRating;
	}
	private String username;
	private long reviewCount;
	private double averageRating;

}
