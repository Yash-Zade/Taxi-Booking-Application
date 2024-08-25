package com.project.taxibookingapp.strategies.impl;

import com.project.taxibookingapp.entities.RideRequest;
import com.project.taxibookingapp.services.DistanceService;
import com.project.taxibookingapp.strategies.RideFareCalculationStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RideFareSurgePricingFareCalculationStrategy implements RideFareCalculationStrategy {

    private  final DistanceService distanceService;
    private static final double SERGE_FACTOR=2;
    @Override
    public double calculateFair(RideRequest rideRequest) {
        double distance = distanceService.calculateDistance(rideRequest.getPickupLocation(),
                rideRequest.getDropOffLocation());
        return distance*RIDE_FARE_MULTIPLAYER*SERGE_FACTOR;
    }
}
