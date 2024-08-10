package com.project.taxibookingapp.strategies.impl;

import com.project.taxibookingapp.dto.RideRequestDto;
import com.project.taxibookingapp.entities.RideRequest;
import com.project.taxibookingapp.strategies.RideFareCalculationStrategy;
import org.springframework.stereotype.Service;


public class RideFareSurgePricingFareCalculationStrategy implements RideFareCalculationStrategy {
    @Override
    public double calculateFair(RideRequest rideRequest) {
        return 0;
    }
}
