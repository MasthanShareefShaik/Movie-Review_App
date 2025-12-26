package com.example.MovieReview.Controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.MovieReview.Entity.Movie;
import com.example.MovieReview.Service.MovieService;

@RestController
@RequestMapping("movie")
//@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {
	
	@Autowired
	private MovieService movieService;
	
	@PostMapping("save")
	public ResponseEntity<Movie>save(@RequestBody Movie movie){
		return ResponseEntity.ok(movieService.savemovie(movie));
	}
	
	@GetMapping("id/{id}")
	public ResponseEntity<Movie>findbyId(@PathVariable Long id){
		Movie m1=null;
		Optional<Movie> optional = movieService.findByid(id);
		if(optional.isPresent()) {
			m1=optional.get();
			return ResponseEntity.ok(m1);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	@GetMapping("title/{title}")
	public ResponseEntity<List<Movie>> findbyTitle(@PathVariable String title){
		return ResponseEntity.ok(movieService.getMovieByTitile(title));
	}
  @GetMapping("all")
  public ResponseEntity<List<Movie>> findall(){
	  return ResponseEntity.ok(movieService.getallMovies());
  }
  @GetMapping("test")
  public String test() {
	  System.out.println("from testing method()");
	  return "from String Controller";
  }
  @GetMapping("/statistics")
  public ResponseEntity<Map<String, Object>>getstatistics(){
	  return ResponseEntity.ok(movieService.getstatistics());
  }
}



