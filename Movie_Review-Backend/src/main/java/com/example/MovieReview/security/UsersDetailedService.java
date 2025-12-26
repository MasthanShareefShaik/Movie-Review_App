package com.example.MovieReview.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.MovieReview.Entity.Users;
import com.example.MovieReview.Repository.UserRepository;

@Service
public class UsersDetailedService implements UserDetailsService {

	@Autowired
	private UserRepository repository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		 Users user = repository.findByName(username)
			        .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
System.out.println(user.getName());
			    return new UsersDetails(user.getName(), user.getPassword(), user.getRoles());
	}

}
