package com.premanand.ecommerce.ecommerce_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.premanand.ecommerce.ecommerce_app.entity.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByEmail(String email);

}
