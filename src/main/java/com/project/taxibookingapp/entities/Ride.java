package com.project.taxibookingapp.entities;

import com.project.taxibookingapp.entities.enums.PaymentMethod;
import com.project.taxibookingapp.entities.enums.RideStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

@Entity
public class Ride {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition = "Geometry(Point,4362)")
    private Point pickupLocation;

    @Column(columnDefinition = "Geometry(Point,4362)")
    private Point dropOffLocation;

    @CurrentTimestamp
    private LocalDateTime createdTime;

    @ManyToOne(fetch = FetchType.LAZY)
    private Rider rider;

    @ManyToOne(fetch = FetchType.LAZY)
    private Driver driver;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    private RideStatus rideStatus;

    private Double fair;

    private String otp;

    private LocalDateTime startedTime;

    private LocalDateTime endedTime;
}
