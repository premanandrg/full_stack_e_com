package com.premanand.ecommerce.ecommerce_app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.premanand.ecommerce.ecommerce_app.dto.AddressDto;
import com.premanand.ecommerce.ecommerce_app.entity.Address;

@Service
public interface AddressService {

    public AddressDto addAddress(AddressDto address);

    public AddressDto getAddress(Long addressId);

    public AddressDto updateAddress(AddressDto address);

    public void deleteAddress(Long addressId);

    public List<Address> getAllAddresses();

    public List<Address> getAddressByUserEmail(String email);
}
