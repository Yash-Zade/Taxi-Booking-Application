package com.project.taxibookingapp.services;

import com.project.taxibookingapp.entities.Payment;
import com.project.taxibookingapp.entities.Ride;
import com.project.taxibookingapp.entities.enums.PaymentStatus;

public interface PaymentService {
    void processPayment(Ride ride);
    Payment createNewPayment(Ride ride);
    void updatePaymentStatus(Payment payment, PaymentStatus status);
}
