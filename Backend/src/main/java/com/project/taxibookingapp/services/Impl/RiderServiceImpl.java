package com.project.taxibookingapp.services.Impl;

import com.project.taxibookingapp.dto.DriverDto;
import com.project.taxibookingapp.dto.RideDto;
import com.project.taxibookingapp.dto.RideRequestDto;
import com.project.taxibookingapp.dto.RiderDto;
import com.project.taxibookingapp.entities.*;
import com.project.taxibookingapp.entities.enums.RideRequestStatus;
import com.project.taxibookingapp.entities.enums.RideStatus;
import com.project.taxibookingapp.exceptions.ResourceNotFoundException;
import com.project.taxibookingapp.repositories.RideRequestRepository;
import com.project.taxibookingapp.repositories.RiderRepository;
import com.project.taxibookingapp.services.*;
import com.project.taxibookingapp.strategies.RideStrategyManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class RiderServiceImpl implements RiderService {

    private final ModelMapper modelMapper;
    private final RideStrategyManager rideStrategyManager;
    private final RideRequestRepository rideRequestRepository;
    private final RiderRepository riderRepository;
    private final RideService rideService;
    private final DriverService driverService;
    private final RatingService ratingService;

    @Override
    @Transactional
    public RideRequestDto requestRide(RideRequestDto rideRequestDto) {

        Rider rider=getCurrentRider();
        RideRequest rideRequest=modelMapper.map(rideRequestDto,RideRequest.class);
        rideRequest.setRideRequestStatus(RideRequestStatus.PENDING);
        rideRequest.setRider(rider);
        Double fare= rideStrategyManager.rideFareCalculationStrategy().calculateFair(rideRequest);
        rideRequest.setFare(fare);

        RideRequest savedRideRequest = rideRequestRepository.save(rideRequest);

        rideStrategyManager.driverMatchingStrategy(rider.getRating()).findMatchingDrivers(rideRequest);

        return modelMapper.map(savedRideRequest,RideRequestDto.class);
    }

    @Override
    public RideDto cancelRide(Long rideId) {
        Rider rider = getCurrentRider();
        Ride ride = rideService.getRideById(rideId);

        if(!rider.equals(ride.getRider())){
            throw new RuntimeException("Rider dose not own this ride with id: "+rideId);
        }
        if(!ride.getRideStatus().equals(RideStatus.CONFORMED)){
            throw new RuntimeException("Ride cannot be canceled, invalid status: "+ride.getRideStatus());
        }

        Ride savedRide = rideService.updateRideStatus(ride,RideStatus.CANCELED);
        driverService.updateDriveAvailability(ride.getDriver(),true);

        return modelMapper.map(savedRide,RideDto.class);

    }

    @Override
    public DriverDto rateDriver(Long rideId, Double rating) {
        Ride ride=rideService.getRideById(rideId);
        Rider rider=getCurrentRider();
        if(!rider.equals(ride.getRider())){
            throw new RuntimeException("Rider is not the owner of ride");
        }
        if(!ride.getRideStatus().equals(RideStatus.ENDED)){
            throw new RuntimeException("Ride status is not ended hence cannot be Rated, status: "+ride.getRideStatus());
        }

        return ratingService.rateDriver(ride,rating);
    }

    @Override
    public RiderDto getMyProfile() {
        Rider rider=getCurrentRider();
        return modelMapper.map(rider, RiderDto.class);
    }

    @Override
    public Page<RideDto> getAllRide(PageRequest pageRequest) {
        Rider rider=getCurrentRider();
        return rideService.getAllRideOfRider(rider, pageRequest).map(
                ride -> modelMapper.map(ride, RideDto.class)
        );
    }

    @Override
    public Rider createNewRider(User user) {
        Rider rider= Rider.builder()
                .user(user)
                .rating(0.0)
                .build();
        return riderRepository.save(rider);
    }

    @Override
    public Rider getCurrentRider() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return riderRepository.findByUser(user).orElseThrow(()-> new ResourceNotFoundException("Rider not associated with user with id: "+ user.getId()));

    }
}
