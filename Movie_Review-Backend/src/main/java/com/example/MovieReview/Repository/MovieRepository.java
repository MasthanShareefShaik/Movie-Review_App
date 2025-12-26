package com.example.MovieReview.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MovieReview.Entity.Movie;
@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
List<Movie>findByMovieNameContainingIgnoreCase(String moviename);
}
