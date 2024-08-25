package com.project.taxibookingapp.strategies.impl;

import com.project.taxibookingapp.entities.Driver;
import com.project.taxibookingapp.entities.Payment;
import com.project.taxibookingapp.entities.Rider;
import com.project.taxibookingapp.entities.enums.PaymentStatus;
import com.project.taxibookingapp.entities.enums.TransactionMethod;
import com.project.taxibookingapp.repositories.PaymentRepository;
import com.project.taxibookingapp.services.PaymentService;
import com.project.taxibookingapp.services.WalletService;
import com.project.taxibookingapp.strategies.PaymentStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class WalletPaymentStrategy implements PaymentStrategy {
    private final WalletService walletService;
    private final PaymentRepository paymentRepository;
    @Transactional
    @Override
    public void processPayment(Payment payment) {
        Driver driver=payment.getRide().getDriver();
        Rider rider = payment.getRide().getRider();
        walletService.deductMoneyToWallet(rider.getUser(), payment.getAmount(), null,payment.getRide(), TransactionMethod.RIDE);

        Double driversCut= payment.getAmount()*(1-PLATFORM_COMMISSION);
        walletService.addMoneyToWallet(driver.getUser(),driversCut,null,payment.getRide(),TransactionMethod.RIDE);
        payment.setPaymentStatus(PaymentStatus.CONFORMED);
        paymentRepository.save(payment);
    }
}
