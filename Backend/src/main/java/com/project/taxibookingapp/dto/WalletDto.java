package com.project.taxibookingapp.dto;

import com.project.taxibookingapp.entities.WalletTransaction;
import lombok.Data;

import java.util.List;

@Data
public class WalletDto {
    private long id;
    private UserDto user;
    private double balance;
    private List<WalletTransaction> transactions;
}
