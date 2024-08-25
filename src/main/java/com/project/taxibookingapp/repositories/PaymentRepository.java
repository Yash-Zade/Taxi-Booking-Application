package com.project.taxibookingapp.repositories;

import com.project.taxibookingapp.entities.Payment;
import com.project.taxibookingapp.entities.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long> {
    Optional<Payment> findByRide(Ride ride);
}
