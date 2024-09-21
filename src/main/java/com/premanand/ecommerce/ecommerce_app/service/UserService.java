package com.premanand.ecommerce.ecommerce_app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.premanand.ecommerce.ecommerce_app.dto.UserDto;
import com.premanand.ecommerce.ecommerce_app.entity.User;

@Service
public interface UserService {

    public UserDto saveUser(User user);

    public UserDto updateUser(User user);

    public UserDto getUserByEmail(String email);

    public UserDto getUserById(Long id);

    public List<UserDto> getAllUsers();

    public List<UserDto> getSellers();

    public void deleteUser(Long id);

}
