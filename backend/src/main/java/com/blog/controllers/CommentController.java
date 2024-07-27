package com.blog.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.entities.Comment;
import com.blog.payloads.ApiResponse;
import com.blog.payloads.CommentDTO;
import com.blog.services.CommentService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/v1")
@SecurityRequirement(name = "bearerAuth")
public class CommentController {
	
	@Autowired
	private CommentService commentService;

	@PostMapping("/posts/{postID}/comments")
	public ResponseEntity<CommentDTO> createComment(@RequestBody CommentDTO commentDto, @PathVariable Integer postID){
		CommentDTO createdComment = this.commentService.createComment(commentDto, postID);
		return new ResponseEntity<CommentDTO>(createdComment, HttpStatus.OK);
	}
	
	@DeleteMapping("/comments/{commentID}")
	public ResponseEntity<ApiResponse> deleteComment(@PathVariable Integer postID){
		this.commentService.deleteComment(postID);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Comment deleted successfully", true) , HttpStatus.OK);
	}
}
