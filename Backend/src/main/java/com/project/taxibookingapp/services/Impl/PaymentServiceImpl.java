package com.project.taxibookingapp.services.Impl;

import com.project.taxibookingapp.entities.Payment;
import com.project.taxibookingapp.entities.Ride;
import com.project.taxibookingapp.entities.enums.PaymentStatus;
import com.project.taxibookingapp.exceptions.ResourceNotFoundException;
import com.project.taxibookingapp.repositories.PaymentRepository;
import com.project.taxibookingapp.services.PaymentService;
import com.project.taxibookingapp.strategies.PaymentStrategyManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentStrategyManager paymentStrategyManager;
    private final PaymentRepository paymentRepository;

    @Override
    public void processPayment(Ride ride) {
        Payment payment=paymentRepository.findByRide(ride)
                .orElseThrow(()-> new ResourceNotFoundException("Payment not found for ride with id: "+ride.getId()));
        paymentStrategyManager.paymentStrategy(payment.getPaymentMethod()).processPayment(payment);
    }

    @Override
    public Payment createNewPayment(Ride ride) {
        Payment payment= Payment.builder()
                .ride(ride)
                .paymentMethod(ride.getPaymentMethod())
                .paymentStatus(PaymentStatus.PENDING)
                .amount(ride.getFare())
                .build();
        return paymentRepository.save(payment);
    }

    @Override
    public void updatePaymentStatus(Payment payment, PaymentStatus status) {
        payment.setPaymentStatus(status);
        paymentRepository.save(payment);
    }
}
