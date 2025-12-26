package com.example.MovieReview.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity

@Table(name = "review_like", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"review_id", "username"})
})
public class ReviewLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "review_id", nullable = false)
    private Review review;

    @Column(nullable = false)
    private String username;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Review getReview() {
		return review;
	}

	public void setReview(Review review) {
		this.review = review;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
    
}
