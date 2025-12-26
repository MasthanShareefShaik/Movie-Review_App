package com.example.MovieReview.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.MovieReview.security.UsersDetailedService;

import jakarta.servlet.http.HttpServletResponse;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
	@Autowired
	private UsersDetailedService usersDetailedService;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
		
		
		 httpSecurity.cors().and()
				.csrf(csrf->csrf.disable())
				.authorizeHttpRequests(auth -> auth.requestMatchers("/register","/logined","/forgotpassword/**","/movie/statistics","/review/recent_reviews","/review/top-reviewers").permitAll().anyRequest().authenticated())
				.formLogin(Customizer.withDefaults())
				.logout().logoutUrl("/logout").invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .logoutSuccessHandler((request, response, authentication) -> {
                    response.setStatus(HttpServletResponse.SC_OK);
                });
		 return httpSecurity.build();
		
	}
	
	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity httpSecurity) throws Exception {

		AuthenticationManagerBuilder authenticationManagerBuilder = httpSecurity.getSharedObject(AuthenticationManagerBuilder.class);
		authenticationManagerBuilder.userDetailsService(usersDetailedService).passwordEncoder(encoder());
		
		return authenticationManagerBuilder.build();
		
	}
	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

}
