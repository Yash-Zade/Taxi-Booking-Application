package com.project.taxibookingapp.services;


import com.project.taxibookingapp.dto.WalletTransactionDto;
import com.project.taxibookingapp.entities.WalletTransaction;

public interface WalletTransactionService {
    void createNewWalletTransaction(WalletTransaction walletTransaction);
}
