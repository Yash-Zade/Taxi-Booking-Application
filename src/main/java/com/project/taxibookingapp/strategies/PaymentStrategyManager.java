package com.project.taxibookingapp.strategies;

import com.project.taxibookingapp.entities.enums.PaymentMethod;
import com.project.taxibookingapp.strategies.impl.CashPaymentStrategy;
import com.project.taxibookingapp.strategies.impl.WalletPaymentStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class PaymentStrategyManager {
    private final WalletPaymentStrategy walletPaymentStrategy;
    private final CashPaymentStrategy cashPaymentStrategy;

    public PaymentStrategy paymentStrategy(PaymentMethod paymentMethod) {
        switch (paymentMethod) {
            case WALLET:
                return walletPaymentStrategy;
            case CASH:
                return cashPaymentStrategy;
            default:
                throw new IllegalArgumentException("Unknown payment method: " + paymentMethod);
        }
    }
}
