package com.project.taxibookingapp.dto;

import com.project.taxibookingapp.entities.Ride;
import com.project.taxibookingapp.entities.RideRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DriverDto {
    private Long id;
    private UserDto user;
    private Double rating;
    private Boolean available;
    private String vehicleId;
    private List<RideRequestDto> rideRequests;
    private RideDto ride;
}
