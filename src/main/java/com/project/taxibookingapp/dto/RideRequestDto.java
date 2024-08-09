package com.project.taxibookingapp.dto;

import com.project.taxibookingapp.entities.Rider;
import com.project.taxibookingapp.entities.enums.PaymentMethod;
import com.project.taxibookingapp.entities.enums.RideRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RideRequestDto {
    private int id;
    private Point pickupLocation;
    private Point dropOffLocation;
    private LocalDateTime requestTime;
    private Rider rider;
    private PaymentMethod paymentMethod;
    private RideRequestStatus rideRequestStatus;
}
