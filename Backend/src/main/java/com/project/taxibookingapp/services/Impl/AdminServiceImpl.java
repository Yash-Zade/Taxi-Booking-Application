package com.project.taxibookingapp.services.Impl;


import com.project.taxibookingapp.dto.DriverDto;
import com.project.taxibookingapp.dto.OnBoardNewDriverDto;
import com.project.taxibookingapp.entities.Driver;
import com.project.taxibookingapp.entities.OnBoardNewDriver;
import com.project.taxibookingapp.entities.User;
import com.project.taxibookingapp.entities.enums.Role;
import com.project.taxibookingapp.exceptions.ResourceNotFoundException;
import com.project.taxibookingapp.exceptions.RuntimeConflictException;
import com.project.taxibookingapp.repositories.OnBoardNewDriverRepository;
import com.project.taxibookingapp.repositories.UserRepository;
import com.project.taxibookingapp.services.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final DriverService driverService;
    private final OnBoardNewDriverRepository onBoardNewDriverRepository;

    @Transactional
    @Override
    public DriverDto onboardNewDriver(Long userId, OnBoardNewDriverDto onBoardNewDriverDto) {
        User user=userRepository.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User not found with id: "+userId));
        if(user.getRoles().contains(Role.DRIVER)){
            throw new RuntimeConflictException("user with id: "+userId+" is already a driver");
        }
        Driver createDriver=Driver.builder()
                .user(user)
                .vehicleId(onBoardNewDriverDto.getVehicleId())
                .rating(0.0)
                .available(true)
                .build();
        user.getRoles().add(Role.DRIVER);
        userRepository.save(user);
        Driver savedDriver = driverService.createNewDriver(createDriver);
        onBoardNewDriverRepository.deleteById(onBoardNewDriverDto.getId());
        return modelMapper.map(savedDriver, DriverDto.class);
    }

    @Transactional
    @Override
    public Void rejectRequest(OnBoardNewDriverDto onBoardNewDriverDto) {

        OnBoardNewDriver onBoardNewDriver = modelMapper.map(onBoardNewDriverDto, OnBoardNewDriver.class);
        onBoardNewDriverRepository.deleteById(onBoardNewDriver.getId());
        return null;
    }
    @Override
    public List<OnBoardNewDriverDto> getAllRequests(){
        return onBoardNewDriverRepository.findAll()
                .stream()
                .map(request->modelMapper.map(request, OnBoardNewDriverDto.class)).collect(Collectors.toList());
    }

    @Override
    public Long getTotalUsers() {
        return userRepository.count();
    }

    @Override
    public Long getTotalRiders() {
        return userRepository.countByRoles(Role.DRIVER);
    }
    @Override
    public Long getTotalDrivers() {
        return userRepository.countByRoles(Role.DRIVER);
    }

    @Override
    public Long getTotalRequests() {
        return onBoardNewDriverRepository.count(); }
}
