package com.blog.controllers;


import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blog.config.AppConstants;
import com.blog.payloads.ApiResponse;
import com.blog.payloads.PostDTO;
import com.blog.payloads.PostResponse;
import com.blog.services.FileService;
import com.blog.services.PostService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/")
@SecurityRequirement(name = "bearerAuth")
public class PostController {
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private FileService fileService;
	
	@Value("${project.image}")
	private String path;
	
	@PostMapping("/user/{userId}/category/{categoryId}/posts")
	public ResponseEntity<PostDTO> createPost(@RequestBody PostDTO postDto,@PathVariable Integer userId,@PathVariable Integer categoryId){
		
		PostDTO createPost = this.postService.createPost(postDto, userId, categoryId);
		return new ResponseEntity<PostDTO>(createPost, HttpStatus.OK);
	}
	
	@GetMapping("/user/{user_id}/posts")
	public ResponseEntity<List<PostDTO>> getPostsByUser(@PathVariable Integer user_id) {
		
		List<PostDTO> posts = this.postService.getPostsByUser(user_id);
		return new ResponseEntity<List<PostDTO>>(posts, HttpStatus.OK);
		
	}
	
	@GetMapping("/category/{category_id}/posts")
	public ResponseEntity<List<PostDTO>> getPostsByCategory(@PathVariable Integer category_id) {
		
		List<PostDTO> posts = this.postService.getPostsByCategory(category_id);
		return new ResponseEntity<List<PostDTO>>(posts, HttpStatus.OK);
		
	}
	
	@GetMapping("/posts/{post_id}")
	public ResponseEntity<PostDTO> getSpecificPost(@PathVariable Integer post_id) {
		
		PostDTO post = this.postService.getPostByID(post_id);
		return new ResponseEntity<PostDTO>(post, HttpStatus.OK);
		
	}
	
	@GetMapping("/posts")
	public ResponseEntity<PostResponse> getAllPosts(
			@RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir) {
		
		PostResponse postResponse = this.postService.getAllPosts(pageNumber, pageSize, sortBy, sortDir);
		return new ResponseEntity<PostResponse>(postResponse, HttpStatus.OK);
		
	}
	
	@DeleteMapping("/posts/{postId}")
	public ApiResponse deletePost(@PathVariable Integer postId) {
		this.postService.deletePost(postId);
		return new ApiResponse("Post deleted successfully!", true);
	}
	
	@PutMapping("/posts/{postId}")
	public ResponseEntity<PostDTO> updatePost(@RequestBody PostDTO postDto, @PathVariable Integer postId) {
		PostDTO updatedPost = this.postService.updatePost(postDto, postId);
		return new ResponseEntity<PostDTO>(updatedPost, HttpStatus.OK);
	}
	
	@GetMapping("/posts/search/{keywords}")
	public ResponseEntity<List<PostDTO>> searchPostByTitle(
			@PathVariable("keywords") String keywords){
		List<PostDTO> result = this.postService.searchPost(keywords);
		return new ResponseEntity<List<PostDTO>>(result, HttpStatus.OK);
		
	}
	
	@PostMapping("/post/image/upload/{postId}")
	public ResponseEntity<PostDTO> uploadPostImage(
			@RequestParam("image") MultipartFile image,
			@PathVariable Integer postId) throws IOException{
		
		PostDTO postDto = this.postService.getPostByID(postId);
		String fileName = this.fileService.uploadImage(path, image);
		postDto.setImageName(fileName);
		PostDTO updatePost = this.postService.updatePost(postDto, postId);
		return new ResponseEntity<PostDTO>(updatePost, HttpStatus.OK) ;
		
	}
	
	//serve the image
	@GetMapping(value="/post/image/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
	public void downloadImage(
			@PathVariable("imageName") String imageName,
			HttpServletResponse response) throws IOException {
		InputStream resource = this.fileService.getResources(path, imageName);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(resource, response.getOutputStream());
		
	}
	

}
