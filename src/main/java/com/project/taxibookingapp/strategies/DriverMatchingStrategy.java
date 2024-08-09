package com.project.taxibookingapp.strategies;

import com.project.taxibookingapp.dto.RideRequestDto;
import com.project.taxibookingapp.entities.Driver;

import java.util.List;

public interface DriverMatchingStrategy {
    List<Driver> findMatchingDrivers(RideRequestDto rideRequestDto);
}
