package com.blog.services;

import java.util.List;

import com.blog.entities.Post;
import com.blog.payloads.PostDTO;
import com.blog.payloads.PostResponse;

public interface PostService {
	
	PostDTO createPost(PostDTO postDto, Integer userId, Integer categoryId);
	
	PostDTO updatePost(PostDTO postDto, Integer postId);
	
	void deletePost(Integer postId);
	
	PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
	
	PostDTO getPostByID(Integer postId);
	
	List<PostDTO> getPostsByCategory(Integer categoryID);
	
	List<PostDTO> getPostsByUser(Integer userID);
	
	List<PostDTO> searchPost(String keyword);

}
