package com.blog.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog.config.AppConstants;
import com.blog.entities.Role;
import com.blog.entities.User;
import com.blog.payloads.UserDTO;
import com.blog.repositories.RoleRepo;
import com.blog.repositories.UserRepo;
import com.blog.services.UserService;
import com.blog.exceptions.*;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepo userrepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepo roleRepo;

	@Override
	public UserDTO createUser(UserDTO userDto) {
		User user = this.dtoToUser(userDto);
		User savedUser = this.userrepo.save(user);
		
		return this.userToDTO(savedUser);
	}

	@Override
	public UserDTO updateUser(UserDTO userDTO, Integer userId) {
		User user = this.userrepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId)); 
		user.setName(userDTO.getName());
		user.setEmail(userDTO.getEmail());
		user.setPassword(userDTO.getPassword());
		user.setAbout(userDTO.getAbout());
		
		User updateUser = this.userrepo.save(user);
		UserDTO userDTO1 = this.userToDTO(updateUser);
		
		return userDTO1;
	}

	@Override
	public UserDTO getUserByID(Integer userId) {
		User user = this.userrepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId)); 
		return this.userToDTO(user);
	}

	@Override
	public List<UserDTO> getAllUsers() {
		
		List<User> users = this.userrepo.findAll();
		List<UserDTO> userDTOs = users.stream().map(user -> this.userToDTO(user)).collect(Collectors.toList());
		
		return userDTOs;
	}

	@Override
	public void deleteUser(Integer userId) {
		User user = this.userrepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId)); 
		this.userrepo.delete(user);
		
	}
	
	private User dtoToUser(UserDTO userDto) {
		
		User user = this.modelMapper.map(userDto, User.class);
		//user.setId(userDto.getId());
		//user.setName(userDto.getName());
		//user.setEmail(userDto.getEmail());
		//user.setPassword(userDto.getPassword());
		//user.setAbout(userDto.getAbout());
		
		return user;
		
	}
	
	public UserDTO userToDTO(User user) {
		
		UserDTO userDto = this.modelMapper.map(user, UserDTO.class);
		return userDto;
	}

	@Override
	public UserDTO registerNewUser(UserDTO userDto) {
		User user = this.modelMapper.map(userDto, User.class);
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		Role role = this.roleRepo.findById(AppConstants.NORMAL_USER).get();
		user.getRoles().add(role);
		User newUser = this.userrepo.save(user);
		return this.modelMapper.map(newUser, UserDTO.class);
	}

}
