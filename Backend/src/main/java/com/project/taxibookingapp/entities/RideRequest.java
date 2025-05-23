package com.project.taxibookingapp.entities;

import com.project.taxibookingapp.entities.enums.PaymentMethod;
import com.project.taxibookingapp.entities.enums.RideRequestStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CurrentTimestamp;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RideRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "Geometry(Point,4326)")
    private Point pickupLocation;

    @Column(columnDefinition = "Geometry(Point,4326)")
    private Point dropOffLocation;

    @CurrentTimestamp
    private LocalDateTime requestTime;

    @ManyToOne()
    private Rider rider;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    private RideRequestStatus rideRequestStatus;

    @ManyToOne()
    private Driver driver;

    private Double fare;
}
