package com.project.taxibookingapp.repositories;

import com.project.taxibookingapp.entities.OnBoardNewDriver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnBoardNewDriverRepository extends JpaRepository<OnBoardNewDriver, Long> {
}
