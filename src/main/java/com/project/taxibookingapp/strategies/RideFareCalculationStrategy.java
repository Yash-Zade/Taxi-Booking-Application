package com.project.taxibookingapp.strategies;

import com.project.taxibookingapp.dto.RideRequestDto;

public interface RideFareCalculationStrategy {

     double calculateFair(RideRequestDto rideRequestDto);
}
