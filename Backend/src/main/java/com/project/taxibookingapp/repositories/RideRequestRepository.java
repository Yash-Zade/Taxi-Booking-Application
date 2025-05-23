package com.project.taxibookingapp.repositories;

import com.project.taxibookingapp.entities.Driver;
import com.project.taxibookingapp.entities.RideRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RideRequestRepository extends JpaRepository<RideRequest,Long> {
    Page<RideRequest> findByDriver(Driver driver, PageRequest pageRequest);

}
