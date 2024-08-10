package com.project.taxibookingapp.strategies;

import com.project.taxibookingapp.entities.RideRequest;



public interface RideFareCalculationStrategy {
     double RIDE_FARE_MULTIPLAYER = 10;
     double calculateFair(RideRequest rideRequest);
}
