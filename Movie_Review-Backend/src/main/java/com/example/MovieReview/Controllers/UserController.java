package com.example.MovieReview.Controllers;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.MovieReview.DTO.ChangepasswordDTO;
import com.example.MovieReview.DTO.ForgotPasswordDTO;
import com.example.MovieReview.DTO.LoginDTO;
import com.example.MovieReview.Entity.Users;
import com.example.MovieReview.Repository.UserRepository;
import com.example.MovieReview.Service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/register")
	public ResponseEntity<String>save(@RequestBody Users users){
       if(userRepository.existsByName(users.getName())) {
			
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Entered user has present already");
		}
		users.setPassword(encoder.encode(users.getPassword()));
		
		return ResponseEntity.ok(userService.save(users));
	}
	@PostMapping("/logined")
	public ResponseEntity<String> login(@RequestBody LoginDTO dto, HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse){
		 try {
		        String result = userService.login(dto, httpServletRequest, httpServletResponse);
		        return ResponseEntity.ok(result);
		    } catch (ResponseStatusException ex) {
		        // This exception includes HTTP status code and message
		        return ResponseEntity.status(ex.getStatusCode()).body(ex.getReason());
		    } catch (Exception ex) {
		        // fallback generic error
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
		    }
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Users>>findall(){
		System.out.println("from find all method");
		return ResponseEntity.ok(userService.findAll());
	}
	@GetMapping("/name/{name}")
	public ResponseEntity<Users> findByName(@PathVariable String name) {
	    Optional<Users> userOpt = userService.findbyname(name);
	   Users u1 =null;
	   if(userOpt.isPresent()) {
		   u1 = userOpt.get();
	   }
	   return ResponseEntity.ok(u1);
	}
	@PostMapping("/changepassword")
	public ResponseEntity<?> changepassword(@RequestBody ChangepasswordDTO changepasswordDTO , Principal principal)
	{
	
		boolean changed= userService.changepassword(principal.getName(), changepasswordDTO.getOldPassword(), changepasswordDTO.getNewPassword());
		if(changed) {
			return ResponseEntity.ok("Password has been changed");
		}
		else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("password change is unsuccessful");
		}
	}
	@PostMapping("/forgotpassword/{username}")
	public ResponseEntity<?>forgotpassword(@PathVariable String username, @RequestBody ForgotPasswordDTO forgotPasswordDTO){
		String updated = userService.forgotpassword(forgotPasswordDTO.getNewpassword(), username);
		 switch (updated) {
	        case "SUCCESS":
	            return ResponseEntity.ok("Password has been updated");

	        case "USER_NOT_FOUND":
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

	        case "SAME_AS_OLD_PASSWORD":
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("New password cannot be same as old password");

	        default:
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
	    }
	}
	@GetMapping("/getuser")
	public ResponseEntity<String> getCurrentUser(Principal principal){
		
		return ResponseEntity.ok(principal.getName());
	}
	


}

