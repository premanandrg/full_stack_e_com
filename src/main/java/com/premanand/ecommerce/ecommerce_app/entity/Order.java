package com.premanand.ecommerce.ecommerce_app.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    private Long id; // Use "id" to match the naming conventions of Cart

    private Long userId;

    @OneToMany(mappedBy = "orderId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;

    private String status;
}
