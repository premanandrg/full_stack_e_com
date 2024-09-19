package com.premanand.ecommerce.ecommerce_app.mapper;

import com.premanand.ecommerce.ecommerce_app.dto.AddressDto;
import com.premanand.ecommerce.ecommerce_app.entity.Address;

public class AddressMapper {

    public static Address mapToAddress(AddressDto addressDto) {
        return new Address(
                addressDto.getId(),
                addressDto.getEmail(),
                addressDto.getName(),
                addressDto.getStreet(),
                addressDto.getCity(),
                addressDto.getPincode()
        );
    }

    public static AddressDto mapToAddressDto(Address address) {
        return new AddressDto(
                address.getId(),
                address.getEmail(),
                address.getName(),
                address.getStreet(),
                address.getCity(),
                address.getPincode()
        );
    }

}
