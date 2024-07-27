package com.blog.services;

import com.blog.payloads.CommentDTO;

public interface CommentService {
	
	CommentDTO createComment(CommentDTO commentDto, Integer postID);
	void deleteComment(Integer commentID);
}
