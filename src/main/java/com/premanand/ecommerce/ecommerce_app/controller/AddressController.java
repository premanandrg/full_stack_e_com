package com.premanand.ecommerce.ecommerce_app.controller;

import java.util.List;

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

import com.premanand.ecommerce.ecommerce_app.dto.AddressDto;
import com.premanand.ecommerce.ecommerce_app.entity.Address;
import com.premanand.ecommerce.ecommerce_app.service.AddressService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/address")
@CrossOrigin()
@AllArgsConstructor
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping
    public ResponseEntity<AddressDto> addAddress(@RequestBody AddressDto addressDto) {

        AddressDto addedAddress = addressService.addAddress(addressDto);

        return new ResponseEntity<>(addedAddress, HttpStatus.CREATED);
    }

    //Build REST api to get all categories
    @GetMapping
    public ResponseEntity<List<Address>> getAllCategories() {
        List<Address> categories = addressService.getAllAddresses();

        return ResponseEntity.ok(categories);
    }

    //Build REST api to GET address by id
    @GetMapping("{id}")
    public ResponseEntity<AddressDto> getAddress(@PathVariable("id") Long addressId) {
        AddressDto address = addressService.getAddress(addressId);

        return ResponseEntity.ok(address);

    }

    //Build REST api to GET address by id
    @GetMapping("/email/{email}")
    public ResponseEntity<List<Address>> getAddress(@PathVariable("email") String email) {
        List<Address> addresses = addressService.getAddressByUserEmail(email);

        return ResponseEntity.ok(addresses);

    }

    //Build REST api to update address
    @PutMapping()
    public ResponseEntity<AddressDto> updateProduct(@RequestBody AddressDto addressDto) {
        AddressDto updatedAddress = addressService.updateAddress(addressDto);
        return ResponseEntity.ok(updatedAddress);
    }

    //Build REST api to delete the Address by id
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAddress(@PathVariable("id") Long addressId) {

        //Check for address existance
        AddressDto address;
        try {
            address = addressService.getAddress(addressId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Address not found!");
        }

        if (address == null) {
            return ResponseEntity.badRequest().body("Address not found!");
        }

        addressService.deleteAddress(addressId);
        return ResponseEntity.ok("address deleted" + address.getCity());

    }
}
