package com.project.taxibookingapp.services;

import com.project.taxibookingapp.dto.DriverDto;
import com.project.taxibookingapp.dto.RideDto;
import com.project.taxibookingapp.dto.RideRequestDto;
import com.project.taxibookingapp.dto.RiderDto;
import com.project.taxibookingapp.entities.Rider;
import com.project.taxibookingapp.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface RiderService {
    RideRequestDto requestRide(RideRequestDto rideRequestDto);
    RideDto cancelRide(Long rideId);
    DriverDto rateDriver(Long driverId, Double rating);
    RiderDto getMyProfile();
    Page<RideDto> getAllRide(PageRequest pageRequest);
    Rider createNewRider(User user);
    Rider getCurrentRider();
}
