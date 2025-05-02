package com.project.taxibookingapp.services.Impl;

import com.project.taxibookingapp.dto.WalletTransactionDto;
import com.project.taxibookingapp.entities.WalletTransaction;
import com.project.taxibookingapp.repositories.WalletTransactionsRepository;
import com.project.taxibookingapp.services.WalletTransactionService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class WalletTransactionServiceImpl implements WalletTransactionService {

    private final ModelMapper modelMapper;
    private final WalletTransactionsRepository walletTransactionsRepository;

    @Override
    public void createNewWalletTransaction(WalletTransaction walletTransaction) {
        walletTransactionsRepository.save(walletTransaction);
    }
}
