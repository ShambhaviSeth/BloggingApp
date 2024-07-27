package com.blog.services.impl;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.blog.entities.Category;
import com.blog.entities.Post;
import com.blog.entities.User;
import com.blog.exceptions.ResourceNotFoundException;
import com.blog.payloads.PostDTO;
import com.blog.payloads.PostResponse;
import com.blog.repositories.CategoryRepo;
import com.blog.repositories.PostRepo;
import com.blog.repositories.UserRepo;
import com.blog.services.PostService;

@Service
public class PostServiceImpl implements PostService{
	
	@Autowired
	private PostRepo postRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private CategoryRepo catRepo;

	@Override
	public PostDTO createPost(PostDTO postDto, Integer userId, Integer categoryId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(()-> new ResourceNotFoundException("User", "User Id", userId) );
		Category cat = this.catRepo.findById(categoryId)
				.orElseThrow(()-> new ResourceNotFoundException("Category", "Category Id", categoryId));
		Post createdPost = this.modelMapper.map(postDto, Post.class);
		createdPost.setImageName("default.png");
		createdPost.setAddedDate(new Date());
		createdPost.setUser(user);
		createdPost.setCategory(cat);
		
		Post newPost = this.postRepo.save(createdPost);
		return this.modelMapper.map(newPost, PostDTO.class);
	}

	@Override
	public PostDTO updatePost(PostDTO postDto, Integer postId) {
		Post post = this.postRepo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "Post id", postId));
		Category category = this.catRepo.findById(postDto.getCategory().getCategoryId()).get();
		post.setTitle(postDto.getTitle());
		post.setContent(postDto.getContent());
		post.setImageName(postDto.getImageName());
		post.setCategory(category);
		Post updatedPost = this.postRepo.save(post);
		return this.modelMapper.map(updatedPost, PostDTO.class);
		
	}

	@Override
	public void deletePost(Integer postId) {
		Post post = this.postRepo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "Post id", postId));
		this.postRepo.delete(post);
		
	}

	@Override
	public PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
		
		Sort sort = sortDir.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
		Pageable p = PageRequest.of(pageNumber, pageSize, sort);
		
		Page<Post> postsPage = this.postRepo.findAll(p);
		List<Post> posts = postsPage.getContent();
		List<PostDTO> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDTO.class)).collect(Collectors.toList());
		
		PostResponse postResponse = new PostResponse();
		postResponse.setContent(postDtos);
		postResponse.setPageNumber(postsPage.getNumber());
		postResponse.setPageSize(postsPage.getSize());
		postResponse.setTotalElements(postsPage.getTotalElements());
		postResponse.setTotalPages(postsPage.getTotalPages());
		postResponse.setLastPage(postsPage.isLast());
		
		return postResponse;
	}

	@Override
	public PostDTO getPostByID(Integer postId) {
		Post post = this.postRepo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "Post id", postId));
		PostDTO postDto = this.modelMapper.map(post, PostDTO.class);
		return postDto;
	}

	@Override
	public List<PostDTO> getPostsByCategory(Integer categoryID) {
		Category cat = this.catRepo.findById(categoryID).orElseThrow(()-> new ResourceNotFoundException("Category", "Category Id", categoryID));
		List<Post> posts = this.postRepo.findByCategory(cat);
		List<PostDTO> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDTO.class)).collect(Collectors.toList());
		return postDtos;
	}

	@Override
	public List<PostDTO> getPostsByUser(Integer userID) {
		User user = this.userRepo.findById(userID).orElseThrow(()-> new ResourceNotFoundException("User", "User Id", userID));
		List<Post> posts = this.postRepo.findByUser(user);
		List<PostDTO> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDTO.class)).collect(Collectors.toList());
		return postDtos;
	}

	@Override
	public List<PostDTO> searchPost(String keyword) {
		List<Post> posts = this.postRepo.findByTitleContaining(keyword);
		List<PostDTO> postDtos = posts.stream().map((post) -> this.modelMapper.map(post, PostDTO.class)).collect(Collectors.toList());
		return postDtos;
	}

}
