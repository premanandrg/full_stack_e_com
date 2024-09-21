package com.premanand.ecommerce.ecommerce_app.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.premanand.ecommerce.ecommerce_app.dto.UserDto;
import com.premanand.ecommerce.ecommerce_app.entity.User;
import com.premanand.ecommerce.ecommerce_app.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@CrossOrigin
@AllArgsConstructor
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    // Add new user
    @PostMapping()
    public ResponseEntity<UserDto> saveUser(@RequestBody User user) {
        UserDto addedUser = userService.saveUser(user);
        return ResponseEntity.ok(addedUser);

    }

    // Add new user
    @PutMapping()
    public ResponseEntity<UserDto> updateUser(@RequestBody User user) {
        UserDto updatedUserDto = userService.updateUser(user);
        return ResponseEntity.ok(updatedUserDto);

    }

    //Build : Get user by email
    @GetMapping("{email}")
    public ResponseEntity<UserDto> getProductById(@PathVariable("email") String email) {
        UserDto userDto = userService.getUserByEmail(email);
        return ResponseEntity.ok(userDto);
    }

    //Get all users
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    @PostMapping("signin")
    public ResponseEntity<?> signInUser(@RequestBody UserDto userDto) {
        UserDto signUser = userService.getUserByEmail(userDto.getEmail());

        if (signUser == null) {
            // Return error response for invalid email
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
        System.out.println(signUser.getPassword());
        System.out.println(userDto.getPassword());

        if (!signUser.getPassword().equals(userDto.getPassword())) {
            // Return error response for wrong password
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
        // If credentials are correct, return the user details
        return ResponseEntity.ok(signUser);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable("id") Long id) {

        UserDto userDto;
        try {
            userDto = userService.getUserById(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("User not found!");
        }

        if (userDto == null) {
            return ResponseEntity.badRequest().body("User not found!");
        }
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted: " + userDto.getName());
    }

    //Get all users
    @GetMapping("/sellers")
    public ResponseEntity<List<UserDto>> getAllSellers() {
        List<UserDto> users = userService.getSellers();

        return ResponseEntity.ok(users);
    }

}
