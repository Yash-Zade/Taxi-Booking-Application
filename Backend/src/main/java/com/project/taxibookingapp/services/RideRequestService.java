package com.project.taxibookingapp.services;

import com.project.taxibookingapp.entities.RideRequest;

public interface RideRequestService {
    RideRequest findRideRequestById(Long rideRequestId);

    void update(RideRequest rideRequest);
}
