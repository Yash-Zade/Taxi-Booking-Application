package com.project.taxibookingapp.services;

import com.project.taxibookingapp.dto.RideRequestDto;
import com.project.taxibookingapp.entities.Driver;
import com.project.taxibookingapp.entities.Ride;
import com.project.taxibookingapp.entities.RideRequest;
import com.project.taxibookingapp.entities.Rider;
import com.project.taxibookingapp.entities.enums.RideStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface RideService {
    Ride getRideById(Long rideId);
    void matchWithDrivers(RideRequestDto rideRequestDto);
    Ride createNewRide(RideRequest rideRequest, Driver driver);
    Ride updateRideStatus(Ride ride, RideStatus rideStatus);
    Page<Ride> getAllRideOfRider(Rider rider, PageRequest pageRequest);
    Page<Ride> getAllRideOfDriver(Driver driver, PageRequest pageRequest);
}
