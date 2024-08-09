package com.project.taxibookingapp.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Wallet{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    private double balance;

    @OneToMany(mappedBy = "wallet",fetch = FetchType.LAZY)
    private List<WalletTransactions> transactions;
}
