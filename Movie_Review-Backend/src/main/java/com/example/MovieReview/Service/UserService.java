package com.example.MovieReview.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.MovieReview.DTO.LoginDTO;
import com.example.MovieReview.Entity.Users;
import com.example.MovieReview.Repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public String save( Users users) {
		userRepository.save(users);
		return "user saved";
	}
	
	public Optional<Users> findbyname(String name){
		
		return userRepository.findByName(name);
	}
	public List<Users> findAll(){
		return userRepository.findAll();
	}
	public String login(LoginDTO dto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
		System.out.println("from userservice class");
	try {
		Authentication authentication = new UsernamePasswordAuthenticationToken(dto.getUserName(),dto.getPassword() );
		authentication = authenticationManager.authenticate(authentication);
		
		SecurityContextHolder.getContext().setAuthentication(authentication); // from here session bases
		HttpSessionSecurityContextRepository contextRepository = new HttpSessionSecurityContextRepository();
		contextRepository.saveContext(SecurityContextHolder.getContext(), httpServletRequest, httpServletResponse);
		 HttpSession session = httpServletRequest.getSession(false); // false = do not create if doesn't exist
		    if (session != null) {
		        System.out.println("JSESSIONID: " + session.getId());
		    } else {
		        System.out.println("No session found");
		    }	
		return "login was succesful";
	
	}
	catch (AuthenticationException ex) {
        // Log the exception to console
        System.err.println("Login failed: " + ex.getMessage());
        // Throw an HTTP 401 Unauthorized error with a message
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials", ex);
    }
		
	
		
	}
	
	public boolean changepassword(String name, String oldPassword, String newPassword) {
		System.out.println("from changepassword service class ");
		Optional<Users> u1 = userRepository.findByName(name);
		if(u1.isEmpty()) {
			return false;
		}
		if(!passwordEncoder.matches(oldPassword, u1.get().getPassword())) { // here to check matches first argument should be raw plain string and second argument is encode one
			System.err.println("Given Old password is incorrect");
			return false;
		}
		u1.get().setPassword(passwordEncoder.encode(newPassword));
		userRepository.save(u1.get());
		return true;
	}
	
	public String forgotpassword(String newpassword,String username) {
		Optional<Users> u1 = userRepository.findByName(username);
		if(u1.isEmpty()) {
			return "USER_NOT_FOUND";
		}
		if(passwordEncoder.matches(newpassword,u1.get().getPassword() )) {
			
			System.err.println("Given new password is same as oldpassword");
			 return "SAME_AS_OLD_PASSWORD";
		}
		
		u1.get().setPassword(passwordEncoder.encode(newpassword));
		userRepository.save(u1.get());
		return "SUCCESS";
		
	}
	

}
