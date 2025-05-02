package com.project.taxibookingapp.services;

import com.project.taxibookingapp.dto.DriverDto;
import com.project.taxibookingapp.dto.RideDto;
import com.project.taxibookingapp.dto.RiderDto;
import com.project.taxibookingapp.entities.Driver;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface DriverService {
    RideDto acceptRide(Long rideRequestId);
    RideDto cancelRide(Long rideId);
    RideDto startRide(Long rideId, String otp);
    RideDto endRide(Long rideId);
    RiderDto rateRider(Long riderId,Double rating);
    DriverDto getMyProfile();
    Page<RideDto> getAllRide(PageRequest pageRequest);
    Driver getCurrentDriver();
    Driver updateDriveAvailability(Driver driver, Boolean available);
    Driver createNewDriver(Driver driver);
}

