package com.project.taxibookingapp.services.Impl;

import com.project.taxibookingapp.dto.DriverDto;
import com.project.taxibookingapp.dto.RiderDto;
import com.project.taxibookingapp.entities.Driver;
import com.project.taxibookingapp.entities.Rating;
import com.project.taxibookingapp.entities.Ride;
import com.project.taxibookingapp.entities.Rider;
import com.project.taxibookingapp.exceptions.ResourceNotFoundException;
import com.project.taxibookingapp.exceptions.RuntimeConflictException;
import com.project.taxibookingapp.repositories.DriverRepository;
import com.project.taxibookingapp.repositories.RatingRepository;
import com.project.taxibookingapp.repositories.RideRepository;
import com.project.taxibookingapp.repositories.RiderRepository;
import com.project.taxibookingapp.services.RatingService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;
    private final RiderRepository riderRepository;
    private final DriverRepository driverRepository;
    private final ModelMapper modelMapper;

    @Override
    public RiderDto rateRider(Ride ride, Double rating) {
        Rider rider =ride.getRider();
        Rating ratingObj=ratingRepository.findByRide(ride)
                .orElseThrow(()-> new ResourceNotFoundException("Rating not found for ride with id: "+ride.getId()));
        if(ratingObj.getDriverRating()!=null)   throw new RuntimeConflictException("Driver is already rated");
        ratingObj.setRiderRating(rating);
        ratingRepository.save(ratingObj);

        Double newRating=ratingRepository.findByRider(rider)
                .stream()
                .mapToDouble(Rating::getRiderRating)
                .average().orElse(0.0);
        rider.setRating(newRating);
        Rider savedRider=riderRepository.save(rider);
        return modelMapper.map(savedRider,RiderDto.class);
    }

    @Override
    public DriverDto rateDriver(Ride ride, Double rating) {
        Driver driver=ride.getDriver();
        Rating ratingObj=ratingRepository.findByRide(ride)
                .orElseThrow(()-> new ResourceNotFoundException("Rating not found for ride with id: "+ride.getId()));
        if(ratingObj.getDriverRating()!=null)   throw new RuntimeConflictException("Driver is already rated");
        ratingObj.setDriverRating(rating);
        ratingRepository.save(ratingObj);

        Double newRating=ratingRepository.findByDriver(driver)
                .stream()
                .mapToDouble(Rating::getDriverRating)
                .average().orElse(0.0);
        driver.setRating(newRating);
        Driver savedDriver=driverRepository.save(driver);
        return modelMapper.map(savedDriver, DriverDto.class);
    }

    @Override
    public void creatNewRating(Ride ride) {
        Rating rating=Rating.builder()
                .driver(ride.getDriver())
                .ride(ride)
                .rider(ride.getRider())
                .build();

        ratingRepository.save(rating);
    }
}
