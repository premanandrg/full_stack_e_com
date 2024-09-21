package com.premanand.ecommerce.ecommerce_app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;
    private String name;

    private String role; // user, seller, admin
    

    @Column(nullable = false)
    private boolean enabled = true; // New field to enable or disable seller

    // @OneToOne(mappedBy = "user")
    // @JsonBackReference
    // private Cart cart;
}
