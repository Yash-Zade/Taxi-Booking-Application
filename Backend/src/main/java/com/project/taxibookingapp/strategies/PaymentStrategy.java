package com.project.taxibookingapp.strategies;

import com.project.taxibookingapp.entities.Payment;

public interface PaymentStrategy {
    Double PLATFORM_COMMISSION=0.3;
    void processPayment(Payment payment);
}
