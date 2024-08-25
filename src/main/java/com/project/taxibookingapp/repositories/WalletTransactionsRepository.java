package com.project.taxibookingapp.repositories;

import com.project.taxibookingapp.entities.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletTransactionsRepository extends JpaRepository<WalletTransaction,Long> {
}
