package com.project.taxibookingapp.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Wallet{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(fetch = FetchType.LAZY,optional = false)
    private User user;

    private double balance = 0.0;

    @OneToMany(mappedBy = "wallet",fetch = FetchType.LAZY)
    private List<WalletTransaction> transactions;

}
