package com.project.taxibookingapp.strategies.impl;

import com.project.taxibookingapp.entities.Driver;
import com.project.taxibookingapp.entities.RideRequest;
import com.project.taxibookingapp.strategies.DriverMatchingStrategy;

import java.util.List;

public class DriverMatchingHighestRatedDriverStrategy implements DriverMatchingStrategy {
    @Override
    public List<Driver> findMatchingDrivers(RideRequest rideRequest) {
        return List.of();
    }
}
