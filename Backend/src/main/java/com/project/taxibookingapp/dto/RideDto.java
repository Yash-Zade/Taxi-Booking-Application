package com.project.taxibookingapp.dto;

import com.project.taxibookingapp.entities.enums.PaymentMethod;
import com.project.taxibookingapp.entities.enums.RideStatus;
import lombok.Data;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

@Data
public class RideDto {
    private int id;
    private PointDto pickupLocation;
    private PointDto dropOffLocation;
    private LocalDateTime createdTime;
    private RiderDto rider;
    private DriverDto driver;
    private PaymentMethod paymentMethod;
    private RideStatus rideStatus;
    private Double fare;
    private LocalDateTime startedTime;
    private LocalDateTime endedTime;
    private String otp;
}
