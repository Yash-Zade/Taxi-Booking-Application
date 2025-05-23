package com.project.taxibookingapp.repositories;

import com.project.taxibookingapp.entities.User;
import com.project.taxibookingapp.entities.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);

    Long countByRoles(Role role);
}
