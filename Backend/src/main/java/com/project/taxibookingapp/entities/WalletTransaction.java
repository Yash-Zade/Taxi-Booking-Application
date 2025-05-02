package com.project.taxibookingapp.entities;

import com.project.taxibookingapp.entities.enums.TransactionMethod;
import com.project.taxibookingapp.entities.enums.TransactionType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class WalletTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    @Enumerated(EnumType.STRING)
    private TransactionMethod transactionMethod;
    @ManyToOne
    private Ride ride;

    private String transactionId;

    @ManyToOne
    private Wallet wallet;

    @CurrentTimestamp
    private LocalDateTime timeStamp;
}
