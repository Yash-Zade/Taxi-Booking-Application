package com.project.taxibookingapp.repositories;

import com.project.taxibookingapp.entities.Rider;
import com.project.taxibookingapp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RiderRepository extends JpaRepository<Rider,Long> {
    Optional<Rider> findByUser(User user);
}
