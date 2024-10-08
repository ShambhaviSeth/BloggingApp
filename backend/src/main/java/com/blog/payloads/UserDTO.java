package com.blog.payloads;

import java.util.HashSet;
import java.util.Set;

import com.blog.entities.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter

@Getter
public class UserDTO {

	private int id;
	
	@NotEmpty
	@Size(min = 4, message = "Username must be minimum 4 characters")
	private String name;
	
	@Email(message = "Email address is invalid")
	private String email;
	
	@NotEmpty
	@Size(min = 3, max= 10, message= "Password must be within the range of 3-10 characters")
	private String password;
	
	@NotEmpty
	private String about;
	
	private Set<RoleDTO> roles = new HashSet<>();
	
	@JsonIgnore
	public String getPassword() {
		return this.password;
	}
	
	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}
}
