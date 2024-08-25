package com.project.taxibookingapp.services.Impl;

import com.project.taxibookingapp.entities.RideRequest;
import com.project.taxibookingapp.exceptions.ResourceNotFoundException;
import com.project.taxibookingapp.repositories.RideRequestRepository;
import com.project.taxibookingapp.services.RideRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RideRequestServiceImpl implements RideRequestService {

    private final RideRequestRepository rideRequestRepository;
    @Override
    public RideRequest findRideRequestById(Long rideRequestId) {
        return rideRequestRepository.findById(rideRequestId)
                .orElseThrow(()-> new ResourceNotFoundException("Ride Request not found with id: "+rideRequestId));
    }

    @Override
    public void update(RideRequest rideRequest) {
        RideRequest toSave=rideRequestRepository.findById(rideRequest.getId())
                        .orElseThrow(()-> new ResourceNotFoundException("Ride request not found with id: "+rideRequest.getId()));
        rideRequestRepository.save(rideRequest);
    }
}
