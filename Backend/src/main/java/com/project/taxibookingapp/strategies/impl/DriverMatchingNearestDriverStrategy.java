package com.project.taxibookingapp.strategies.impl;

import com.project.taxibookingapp.entities.Driver;
import com.project.taxibookingapp.entities.RideRequest;
import com.project.taxibookingapp.repositories.DriverRepository;
import com.project.taxibookingapp.strategies.DriverMatchingStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DriverMatchingNearestDriverStrategy implements DriverMatchingStrategy {

    private final DriverRepository driverRepository;
    @Override
    public List<Driver> findMatchingDrivers(RideRequest rideRequest) {

        return driverRepository.findTenNearestDrivers(rideRequest.getPickupLocation());
    }
}
