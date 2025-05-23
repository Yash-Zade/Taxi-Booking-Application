package com.project.taxibookingapp.services.Impl;

import com.project.taxibookingapp.dto.DriverDto;
import com.project.taxibookingapp.dto.RideDto;
import com.project.taxibookingapp.dto.RideRequestDto;
import com.project.taxibookingapp.dto.RiderDto;
import com.project.taxibookingapp.entities.Driver;
import com.project.taxibookingapp.entities.Ride;
import com.project.taxibookingapp.entities.RideRequest;
import com.project.taxibookingapp.entities.User;
import com.project.taxibookingapp.entities.enums.RideRequestStatus;
import com.project.taxibookingapp.entities.enums.RideStatus;
import com.project.taxibookingapp.exceptions.ResourceNotFoundException;
import com.project.taxibookingapp.repositories.DriverRepository;
import com.project.taxibookingapp.repositories.RideRequestRepository;
import com.project.taxibookingapp.services.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

    private final RideRequestService rideRequestService;
    private final DriverRepository driverRepository;
    private final RideService rideService;
    private final ModelMapper modelMapper;
    private final PaymentService paymentService;
    private final RatingService ratingService;
    private final RideRequestRepository rideRequestRepository;

    @Override
    public RideDto acceptRide(Long rideRequestId) {
        RideRequest rideRequest=rideRequestService.findRideRequestById(rideRequestId);
        if(!rideRequest.getRideRequestStatus().equals(RideRequestStatus.PENDING)){
            throw new RuntimeException("Ride Request cannot be accepted, status is "+rideRequest.getRideRequestStatus());
        }
        rideRequest.setRideRequestStatus(RideRequestStatus.CONFORMED);
        Driver currentDriver =getCurrentDriver();
        if(!currentDriver.getAvailable()){
            throw new RuntimeException("Driver cannot accept ride due to unavailability");
        }
        Driver savedDriver = updateDriveAvailability(currentDriver,false);
        Ride ride = rideService.createNewRide(rideRequest,savedDriver);
        return modelMapper.map(ride,RideDto.class);
    }

    @Override
    public RideDto cancelRide(Long rideId) {
        Ride ride=rideService.getRideById(rideId);
        Driver driver = getCurrentDriver();
        if(!driver.equals(ride.getDriver())){
            throw new RuntimeException("Driver cannot cancel the ride as he did not accepted it earlier");
        }
        if(!ride.getRideStatus().equals(RideStatus.CONFORMED)){
            throw new RuntimeException("Ride cannot be canceled, invalid status: "+ride.getRideStatus());
        }

        rideService.updateRideStatus(ride,RideStatus.CANCELED);
        updateDriveAvailability(driver,true);
        return modelMapper.map(ride,RideDto.class);
    }

    @Override
    public RideDto startRide(Long rideId, String otp) {
        Ride ride=rideService.getRideById(rideId);
        Driver driver = getCurrentDriver();
        if(!driver.equals(ride.getDriver())){
            throw new RuntimeException("Driver cannot start a ride as he as not accepted it earlier");
        }
        if(!ride.getRideStatus().equals(RideStatus.CONFORMED)){
            throw new RuntimeException("Ride status is not conformed hence cannot be started, status: "+ride.getRideStatus());
        }
        if(!otp.equals(ride.getOtp())){
            throw new RuntimeException("invalid OTP");
        }
        ride.setStartedTime(LocalDateTime.now());
        Ride savedRide = rideService.updateRideStatus(ride,RideStatus.ONGOING);
        paymentService.createNewPayment(savedRide);
        ratingService.creatNewRating(ride);
        return modelMapper.map(savedRide,RideDto.class);
    }

    @Override
    public RideDto endRide(Long rideId) {
        Ride ride=rideService.getRideById(rideId);
        Driver driver = getCurrentDriver();
        if(!driver.equals(ride.getDriver())){
            throw new RuntimeException("Driver cannot start a ride as he as not accepted it earlier");
        }
        if(!ride.getRideStatus().equals(RideStatus.ONGOING)){
            throw new RuntimeException("Ride status is not conformed hence cannot be started, status: "+ride.getRideStatus());
        }
        ride.setEndedTime(LocalDateTime.now());
        Ride savedRide=rideService.updateRideStatus(ride,RideStatus.ENDED);
        updateDriveAvailability(driver,true);
        paymentService.processPayment(ride);
        return modelMapper.map(savedRide, RideDto.class);
    }

    @Override
    public RiderDto rateRider(Long rideId, Double rating) {
        Ride ride=rideService.getRideById(rideId);
        Driver driver=getCurrentDriver();
        if(!driver.equals(ride.getDriver())){
            throw new RuntimeException("Driver is not the owner of ride");
        }
        if(!ride.getRideStatus().equals(RideStatus.ENDED)){
            throw new RuntimeException("Ride status is not ended hence cannot be Rated, status: "+ride.getRideStatus());
        }

        return ratingService.rateRider(ride,rating);
    }

    @Override
    public DriverDto getMyProfile() {
        Driver driver=getCurrentDriver();
        return modelMapper.map(driver, DriverDto.class);
    }

    @Override
    public Page<RideDto> getAllRide(PageRequest pageRequest) {
        Driver driver=getCurrentDriver();
        return rideService.getAllRideOfDriver(driver, pageRequest).map(
                ride -> modelMapper.map(ride, RideDto.class)
        );
    }

    @Override
    public Driver getCurrentDriver() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return driverRepository.findByUser(user).orElseThrow(()-> new ResourceNotFoundException("Driver not associated with user with id: "+ user.getId()));
    }

    @Override
    public Driver updateDriveAvailability(Driver driver, Boolean available) {
        driver.setAvailable(available);
        return driverRepository.save(driver);
    }

    @Override
    public Driver createNewDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    @Override
    public Page<RideRequestDto> getAllRideRequest(PageRequest pageRequest) {
        Driver driver=getCurrentDriver();
        return rideRequestRepository.findByDriver(driver, pageRequest).map(
                rideRequest -> modelMapper.map(rideRequest, RideRequestDto.class)
        );
    }
}
