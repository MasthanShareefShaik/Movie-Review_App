package com.example.MovieReview.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MovieReview.Entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
	Optional<Users> findByName(String name);
    boolean existsByName(String name);
}
