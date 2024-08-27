package com.project.taxibookingapp.controllers;

import com.project.taxibookingapp.dto.DriverDto;
import com.project.taxibookingapp.dto.OnBoardNewDriverDto;
import com.project.taxibookingapp.dto.SignupDto;
import com.project.taxibookingapp.dto.UserDto;
import com.project.taxibookingapp.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping(path = "/signup")
    public ResponseEntity<UserDto> signUp(@RequestBody SignupDto signupDto){
        return new ResponseEntity<>(authService.signup(signupDto), HttpStatus.CREATED);
    }
    @PostMapping(path="onBoardNewDriver/{userId}")
    public ResponseEntity<DriverDto> onBoardNewDriver(@PathVariable Long userId,@RequestBody OnBoardNewDriverDto onBoardNewDriverDto){
        return new ResponseEntity<>(authService.onboardNewDriver(userId, onBoardNewDriverDto.getVehicleId()),HttpStatus.CREATED);
    }
}
