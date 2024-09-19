package com.premanand.ecommerce.ecommerce_app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.premanand.ecommerce.ecommerce_app.dto.UserDto;
import com.premanand.ecommerce.ecommerce_app.entity.User;
import com.premanand.ecommerce.ecommerce_app.exception.ResourceNotFundException;
import com.premanand.ecommerce.ecommerce_app.mapper.UserMapper;
import com.premanand.ecommerce.ecommerce_app.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDto saveUser(User user) {
        return UserMapper.mapToUserDto(userRepository.save(user));
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);

        return UserMapper.mapToUserDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map((user) -> UserMapper.mapToUserDto(user)).collect(Collectors.toList());

    }

    // @Override
    // public UserDto getUserByEmail(String email) {
    //     return userRepository.findById(email)
    //             .map(this::convertToDto) // Convert User to UserDto
    //             .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    // }
    // private UserDto convertToDto(User user) {
    //     return UserMapper.mapToUserDto(user);
    // }
    @Override
    public UserDto updateUser(User user) {
        return UserMapper.mapToUserDto(userRepository.save(user));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFundException("Category not found! " + id.toString()));
        return UserMapper.mapToUserDto(user);
    }
}
