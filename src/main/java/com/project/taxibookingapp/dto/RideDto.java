package com.project.taxibookingapp.dto;

import com.project.taxibookingapp.entities.enums.PaymentMethod;
import com.project.taxibookingapp.entities.enums.RideStatus;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

public class RideDto {
    private int id;
    private Point pickupLocation;
    private Point dropOffLocation;
    private LocalDateTime createdTime;
    private RiderDto rider;
    private DriverDto driver;
    private PaymentMethod paymentMethod;
    private RideStatus rideStatus;
    private Double fair;
    private LocalDateTime startedTime;
    private LocalDateTime endedTime;
}
