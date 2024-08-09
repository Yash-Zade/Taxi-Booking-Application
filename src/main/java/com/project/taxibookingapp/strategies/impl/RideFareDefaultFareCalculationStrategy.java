package com.project.taxibookingapp.strategies.impl;

import com.project.taxibookingapp.dto.RideRequestDto;
import com.project.taxibookingapp.strategies.RideFareCalculationStrategy;

public class RideFareDefaultFareCalculationStrategy implements RideFareCalculationStrategy {
    @Override
    public double calculateFair(RideRequestDto rideRequestDto) {
        return 0;
    }
}
