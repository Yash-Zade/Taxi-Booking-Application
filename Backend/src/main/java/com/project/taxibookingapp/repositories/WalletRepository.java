package com.project.taxibookingapp.repositories;

import com.project.taxibookingapp.entities.User;
import com.project.taxibookingapp.entities.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<Wallet,Long> {

    Optional<Wallet> findByUser(User user);
}
