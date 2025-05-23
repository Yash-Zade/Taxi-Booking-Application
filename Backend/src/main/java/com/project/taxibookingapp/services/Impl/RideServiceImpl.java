package com.project.taxibookingapp.services.Impl;

import com.project.taxibookingapp.dto.RideRequestDto;
import com.project.taxibookingapp.entities.Driver;
import com.project.taxibookingapp.entities.Ride;
import com.project.taxibookingapp.entities.RideRequest;
import com.project.taxibookingapp.entities.Rider;
import com.project.taxibookingapp.entities.enums.RideRequestStatus;
import com.project.taxibookingapp.entities.enums.RideStatus;
import com.project.taxibookingapp.exceptions.ResourceNotFoundException;
import com.project.taxibookingapp.repositories.RideRepository;
import com.project.taxibookingapp.services.EmailSenderService;
import com.project.taxibookingapp.services.RideRequestService;
import com.project.taxibookingapp.services.RideService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class RideServiceImpl implements RideService {

    private final RideRepository rideRepository;
    private final RideRequestService rideRequestService;
    private final ModelMapper modelMapper;
    private final EmailSenderService emailSenderService;

    @Override
    public Ride getRideById(Long rideId) {
        return rideRepository.findById(rideId)
                .orElseThrow(()-> new ResourceNotFoundException("Ride not found with Id: "+ rideId));
    }

    @Override
    public void matchWithDrivers(RideRequestDto rideRequestDto) {

    }

    @Override
    public Ride createNewRide(RideRequest rideRequest, Driver driver) {
        String otp = generateRandomOtp();
        rideRequest.setRideRequestStatus(RideRequestStatus.CONFORMED);
        Ride ride = modelMapper.map(rideRequest,Ride.class);
        ride.setRideStatus(RideStatus.CONFORMED);
        ride.setDriver(driver);
        ride.setOtp(otp);
        ride.setId(null);

        emailSenderService.sendEmail(rideRequest.getRider().getUser().getEmail(), "Your Taxi Booking OTP", "Your OTP is: " + otp);

        rideRequestService.update(rideRequest);
        return rideRepository.save(ride);
    }

    @Override
    public Ride updateRideStatus(Ride ride, RideStatus rideStatus) {
        ride.setRideStatus(rideStatus);
        return rideRepository.save(ride);
    }

    @Override
    public Page<Ride> getAllRideOfRider(Rider rider, PageRequest pageRequest) {
        return rideRepository.findByRider(rider,pageRequest);
    }

    @Override
    public Page<Ride> getAllRideOfDriver(Driver driver, PageRequest pageRequest) {

        return rideRepository.findByDriver(driver,pageRequest);
    }

    private String generateRandomOtp() {
        Random random = new Random();
        int otp = random.nextInt(10000);
        return String.format("%04d",otp);
    }
}
