package com.blog.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.blog.payloads.CategoryDTO;

public interface CategoryService {

	//create
	CategoryDTO createCategory(CategoryDTO categoryDto);
	
	//update
	CategoryDTO updateCategory(CategoryDTO categoryDto, Integer categoryId);
	
	//delete
	void deleteCategory(Integer categoryId);
	
	//get
	CategoryDTO getSpecificCategory(Integer categoryId);
	
	//getAll
	public List<CategoryDTO> getAllCategories();
}
