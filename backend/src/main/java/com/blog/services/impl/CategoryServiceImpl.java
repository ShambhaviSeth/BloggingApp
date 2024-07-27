package com.blog.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.payloads.CategoryDTO;
import com.blog.repositories.CategoryRepo;
import com.blog.services.CategoryService;
import com.blog.entities.Category;
import com.blog.exceptions.*;

@Service
public class CategoryServiceImpl implements CategoryService{
	
	private static final Object Category = null;

	@Autowired
	private CategoryRepo categoryRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	

	@Override
	public CategoryDTO createCategory(CategoryDTO categoryDto) {
		Category cat = this.modelMapper.map(categoryDto, Category.class);
		Category createdCategory = this.categoryRepo.save(cat);
		return this.modelMapper.map(createdCategory, CategoryDTO.class);
	}

	@Override
	public CategoryDTO updateCategory(CategoryDTO categoryDto, Integer categoryId) {
		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "Category id", categoryId));
		cat.setCategoryTitle(categoryDto.getCategoryTitle());
		cat.setCategoryDesc(categoryDto.getCategoryDesc());
		
		Category updatedCat = this.categoryRepo.save(cat);
		return this.modelMapper.map(updatedCat, CategoryDTO.class);
	}

	@Override
	public void deleteCategory(Integer categoryId) {
		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "Category id", categoryId));
		this.categoryRepo.delete(cat);
		
	}

	@Override
	public CategoryDTO getSpecificCategory(Integer categoryId) {
		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "Category id", categoryId));
		return this.modelMapper.map(cat, CategoryDTO.class);
	}

	@Override
	public List<CategoryDTO> getAllCategories() {
		List<Category> catList = this.categoryRepo.findAll();
		List<CategoryDTO> catDTOList = catList.stream().map((cat) -> this.modelMapper.map(cat, CategoryDTO.class)).collect(Collectors.toList());
		return catDTOList;
	}
	
	

}
