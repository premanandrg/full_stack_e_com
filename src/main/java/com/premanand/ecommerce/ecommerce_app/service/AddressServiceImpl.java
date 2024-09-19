package com.premanand.ecommerce.ecommerce_app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.premanand.ecommerce.ecommerce_app.dto.AddressDto;
import com.premanand.ecommerce.ecommerce_app.entity.Address;
import com.premanand.ecommerce.ecommerce_app.exception.ResourceNotFundException;
import com.premanand.ecommerce.ecommerce_app.mapper.AddressMapper;
import com.premanand.ecommerce.ecommerce_app.repository.AddressRepository;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public AddressDto addAddress(AddressDto address) {

        Address savedAddress = addressRepository.save(AddressMapper.mapToAddress(address));

        return AddressMapper.mapToAddressDto(savedAddress);

    }

    @Override
    public AddressDto getAddress(Long addressId) {
        Address address = addressRepository.findById(addressId).orElseThrow(() -> new ResourceNotFundException("Category not found! " + addressId.toString()));
        return AddressMapper.mapToAddressDto(address);
    }

    @Override
    public AddressDto updateAddress(AddressDto address) {
        Address savedAddress = addressRepository.save(AddressMapper.mapToAddress(address));
        return AddressMapper.mapToAddressDto(savedAddress);
    }

    @Override
    public void deleteAddress(Long addressId) {
        addressRepository.deleteById(addressId);

    }

    @Override
    public List<Address> getAllAddresses() {
        List<Address> addresses = addressRepository.findAll();
        return addresses;
    }

    @Override
    public List<Address> getAddressByUserEmail(String email) {

        return addressRepository.findByEmail(email);

    }

}
