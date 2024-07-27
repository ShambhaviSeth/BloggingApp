package com.blog.payloads;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.blog.entities.Category;
import com.blog.entities.Comment;
import com.blog.entities.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDTO {
	
	private String title;
	
	private String content;
	
	private String imageName;
	
	private Date addedDate;
	
	private CategoryDTO category;
	
	private UserDTO user;
	
	private Integer postId;
	
	private Set<CommentDTO> comments = new HashSet<>();
}
