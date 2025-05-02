package com.project.taxibookingapp.entities;

import jakarta.persistence.*;
import lombok.*;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private Ride ride;

    @ManyToOne
    private Rider rider;

    @ManyToOne
    private Driver driver;

    private Double driverRating;
    private Double riderRating;
}
