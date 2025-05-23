package com.project.taxibookingapp.services;

import com.project.taxibookingapp.dto.DriverDto;
import com.project.taxibookingapp.dto.OnBoardNewDriverDto;

import java.util.List;

public interface AdminService {

    DriverDto onboardNewDriver(Long userId, OnBoardNewDriverDto onBoardNewDriverDto);

    Void rejectRequest(OnBoardNewDriverDto onBoardNewDriverDto);

    List<OnBoardNewDriverDto> getAllRequests();

    Long getTotalUsers();

    Long getTotalRiders();

    Long getTotalDrivers();

    Long getTotalRequests();
}
