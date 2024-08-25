package com.project.taxibookingapp.dto;

import com.project.taxibookingapp.entities.Ride;
import com.project.taxibookingapp.entities.Wallet;
import com.project.taxibookingapp.entities.enums.TransactionMethod;
import com.project.taxibookingapp.entities.enums.TransactionType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
public class WalletTransactionDto {
    private Long id;
    private Double amount;
    private TransactionType transactionType;
    private TransactionMethod transactionMethod;
    private RideDto ridedto;
    private String transactionId;
    private WalletDto wallet;
    private LocalDateTime timeStamp;
}
