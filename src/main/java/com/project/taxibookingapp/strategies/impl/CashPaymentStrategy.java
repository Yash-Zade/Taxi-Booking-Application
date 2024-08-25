package com.project.taxibookingapp.strategies.impl;

import com.project.taxibookingapp.entities.Driver;
import com.project.taxibookingapp.entities.Payment;
import com.project.taxibookingapp.entities.enums.PaymentStatus;
import com.project.taxibookingapp.entities.enums.TransactionMethod;
import com.project.taxibookingapp.repositories.PaymentRepository;
import com.project.taxibookingapp.services.PaymentService;
import com.project.taxibookingapp.services.WalletService;
import com.project.taxibookingapp.strategies.PaymentStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CashPaymentStrategy implements PaymentStrategy {

    private final PaymentRepository paymentRepository;
    private final WalletService walletService;

    @Override
    public void processPayment(Payment payment) {
        Driver driver=payment.getRide().getDriver();

        double platformCommission= payment.getAmount()*PLATFORM_COMMISSION;
        walletService.deductMoneyToWallet(driver.getUser(),platformCommission,null,payment.getRide(), TransactionMethod.RIDE);
        payment.setPaymentStatus(PaymentStatus.CONFORMED);
        paymentRepository.save(payment);
    }
}
