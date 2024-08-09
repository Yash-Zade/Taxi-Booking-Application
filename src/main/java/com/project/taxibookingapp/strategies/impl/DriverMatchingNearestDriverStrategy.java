package com.project.taxibookingapp.strategies.impl;

import com.project.taxibookingapp.dto.RideRequestDto;
import com.project.taxibookingapp.entities.Driver;
import com.project.taxibookingapp.strategies.DriverMatchingStrategy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverMatchingNearestDriverStrategy implements DriverMatchingStrategy {
    @Override
    public List<Driver> findMatchingDrivers(RideRequestDto rideRequestDto) {
        return List.of();
    }
}
