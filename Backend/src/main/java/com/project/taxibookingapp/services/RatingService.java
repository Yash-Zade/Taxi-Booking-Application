package com.project.taxibookingapp.services;

import com.project.taxibookingapp.dto.DriverDto;
import com.project.taxibookingapp.dto.RiderDto;
import com.project.taxibookingapp.entities.Driver;
import com.project.taxibookingapp.entities.Ride;
import com.project.taxibookingapp.entities.Rider;

public interface RatingService {
    RiderDto rateRider(Ride ride, Double rating);
    DriverDto rateDriver(Ride ride, Double rating);
    void creatNewRating(Ride ride);
}
