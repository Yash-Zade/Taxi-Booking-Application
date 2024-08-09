package com.project.taxibookingapp.entities;

import com.project.taxibookingapp.entities.enums.PaymentMethod;
import com.project.taxibookingapp.entities.enums.RideRequestStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

@Entity
public class RideRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition = "Geometry(Point,4362)")
    private Point pickupLocation;

    @Column(columnDefinition = "Geometry(Point,4362)")
    private Point dropOffLocation;

    @CurrentTimestamp
    private LocalDateTime requestTime;

    @ManyToOne(fetch = FetchType.LAZY)
    private Rider rider;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    private RideRequestStatus rideRequestStatus;
}
