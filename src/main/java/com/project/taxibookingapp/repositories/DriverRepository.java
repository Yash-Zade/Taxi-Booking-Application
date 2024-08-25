package com.project.taxibookingapp.repositories;

import com.project.taxibookingapp.entities.Driver;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver,Long> {

    @Query(value = "SELECT d.*, ST_Distance(d.current_location, :pickupLocation) AS distance " +
            "FROM Driver d " +
            "WHERE d.available = true AND ST_DWithin(d.current_location, :pickupLocation, 10000) " +
            "ORDER BY distance " +
            "LIMIT 10", nativeQuery = true)
    List<Driver> findTenNearestDrivers(Point pickupLocation);

    @Query(value = "SELECt d.* " +
            "FROM Driver d " +
            "WHERE d.available = true AND ST_DWithin(d.current_location, :pickupLocation, 15000) " +
            "ORDER BY d.rating DESC " +
            "LIMIT 10", nativeQuery = true)
    List<Driver> findTenNearestByTopRatingDriver(Point pickupLocation);

}
