package com.project.taxibookingapp.services.Impl;

import com.project.taxibookingapp.dto.RideDto;
import com.project.taxibookingapp.dto.WalletDto;
import com.project.taxibookingapp.dto.WalletTransactionDto;
import com.project.taxibookingapp.entities.Ride;
import com.project.taxibookingapp.entities.User;
import com.project.taxibookingapp.entities.Wallet;
import com.project.taxibookingapp.entities.WalletTransaction;
import com.project.taxibookingapp.entities.enums.TransactionMethod;
import com.project.taxibookingapp.entities.enums.TransactionType;
import com.project.taxibookingapp.exceptions.ResourceNotFoundException;
import com.project.taxibookingapp.repositories.WalletRepository;
import com.project.taxibookingapp.services.WalletService;
import com.project.taxibookingapp.services.WalletTransactionService;
import jakarta.transaction.Transaction;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;
    private final ModelMapper modelMapper;
    private final WalletTransactionService walletTransactionService;

    @Override
    @Transactional
    public Wallet addMoneyToWallet(User user, Double amount, String transactionId, Ride ride , TransactionMethod transactionMethod) {
        Wallet wallet = findByUser(user);
        wallet.setBalance(wallet.getBalance()+amount);
        WalletTransaction walletTransaction = WalletTransaction.builder()
                .transactionId(transactionId)
                .ride(ride)
                .wallet(wallet)
                .transactionType(TransactionType.CREDIT)
                .amount(amount)
                .transactionMethod(transactionMethod)
                .build();

        walletTransactionService.createNewWalletTransaction(walletTransaction);
        return walletRepository.save(wallet);
    }

    @Override
    @Transactional
    public Wallet deductMoneyToWallet(User user, Double amount, String transactionId, Ride ride , TransactionMethod transactionMethod) {
        Wallet wallet = findByUser(user);
        wallet.setBalance(wallet.getBalance()-amount);
        WalletTransaction walletTransaction = WalletTransaction.builder()
                .transactionId(transactionId)
                .ride(ride)
                .wallet(wallet)
                .transactionType(TransactionType.DEBIT)
                .amount(amount)
                .transactionMethod(transactionMethod)
                .build();

        wallet.getTransactions().add(walletTransaction);
        return walletRepository.save(wallet);

    }

    @Override
    public void withdrawAllMyMoneyFromWallet() {

    }

    @Override
    public Wallet findWalletById(Long walletId) {
        return walletRepository.findById(walletId)
                .orElseThrow(()-> new ResourceNotFoundException("Wallet not found with id: "+walletId));
    }

    @Override
    public Wallet cerateNewWallet(User user) {
        Wallet wallet=new Wallet();
        wallet.setUser(user);
        return walletRepository.save(wallet);
    }

    @Override
    public Wallet findByUser(User user) {
        return walletRepository.findByUser(user)
                .orElseThrow(()-> new ResourceNotFoundException("Wallet not found with id: "+user.getId()));
    }
}
