package com.blog.payloads;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PostResponse {
	
	private List<PostDTO> content;
	private Integer pageNumber;
	private Integer pageSize;
	private Integer totalPages;
	private long totalElements;
	private boolean lastPage;

}
