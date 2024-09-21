package com.premanand.ecommerce.ecommerce_app.mapper;

import com.premanand.ecommerce.ecommerce_app.dto.UserDto;
import com.premanand.ecommerce.ecommerce_app.entity.User;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getName(),
                user.getRole(),
                user.isEnabled()
                
        );
    }

    public static User mapToUser(UserDto userDto) {
        return new User(
                userDto.getId(),
                userDto.getEmail(),
                userDto.getPassword(),
                userDto.getName(),
                userDto.getRole(),
                userDto.isEnabled()
              
        );
    }

}
