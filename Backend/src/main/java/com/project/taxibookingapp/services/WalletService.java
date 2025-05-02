package com.project.taxibookingapp.services;

import com.project.taxibookingapp.entities.Ride;
import com.project.taxibookingapp.entities.User;
import com.project.taxibookingapp.entities.Wallet;
import com.project.taxibookingapp.entities.enums.TransactionMethod;

public interface WalletService {
    Wallet addMoneyToWallet(User user, Double amount, String transactionId, Ride ride , TransactionMethod transactionMethod);
    Wallet deductMoneyToWallet(User user, Double amount, String transactionId, Ride ride , TransactionMethod transactionMethod);
    void withdrawAllMyMoneyFromWallet();
    Wallet findWalletById(Long walletId);
    Wallet cerateNewWallet(User user);
    Wallet findByUser(User user);
}
