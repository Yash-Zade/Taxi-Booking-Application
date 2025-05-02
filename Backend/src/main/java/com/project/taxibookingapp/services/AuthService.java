package com.project.taxibookingapp.services;

import com.project.taxibookingapp.dto.DriverDto;
import com.project.taxibookingapp.dto.SignupDto;
import com.project.taxibookingapp.dto.UserDto;

public interface AuthService {
    String[] login(String email,String Password);
    UserDto signup(SignupDto signupDto);
    DriverDto onboardNewDriver(Long userId,String vehicleId);

    String refreshToken(String refreshToken);
}
