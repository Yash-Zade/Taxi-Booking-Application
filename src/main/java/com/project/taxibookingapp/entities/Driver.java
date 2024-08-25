package com.project.taxibookingapp.entities;

import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    private Double rating;

    private Boolean available;

    @OneToOne
    private Ride ride;

    private String vehicleId;

    @Column(columnDefinition = "Geometry(Point,4326)")
    private Point currentLocation;
}
