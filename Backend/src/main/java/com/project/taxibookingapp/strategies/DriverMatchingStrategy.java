package com.project.taxibookingapp.strategies;

import com.project.taxibookingapp.entities.Driver;
import com.project.taxibookingapp.entities.RideRequest;

import java.util.List;

public interface DriverMatchingStrategy {
    List<Driver> findMatchingDrivers(RideRequest rideRequest);
}
