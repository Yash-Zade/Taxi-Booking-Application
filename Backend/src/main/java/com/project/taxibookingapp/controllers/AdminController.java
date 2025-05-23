package com.project.taxibookingapp.controllers;


import com.project.taxibookingapp.dto.DriverDto;
import com.project.taxibookingapp.dto.OnBoardNewDriverDto;
import com.project.taxibookingapp.services.AdminService;
import com.project.taxibookingapp.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://cabzilla.vercel.app")
@RestController
@RequestMapping(path="/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @Secured("ROLE_ADMIN")
    @PostMapping(path="onBoardNewDriver/{userId}")
    public ResponseEntity<DriverDto> onBoardNewDriver(@PathVariable Long userId, @RequestBody OnBoardNewDriverDto onBoardNewDriverDto){
        return new ResponseEntity<>(adminService.onboardNewDriver(userId, onBoardNewDriverDto), HttpStatus.CREATED);
    }

    @PostMapping(path = "/reject")
    public ResponseEntity<Void> rejectRequest(@RequestBody OnBoardNewDriverDto onBoardNewDriverDto){
        return ResponseEntity.ok(adminService.rejectRequest(onBoardNewDriverDto));
    }

    @GetMapping(path = "/getAllRequest")
    public ResponseEntity<List<OnBoardNewDriverDto>> getAllRequest(){
        return ResponseEntity.ok(adminService.getAllRequests());
    }

    @GetMapping(path = "/count/allRequests")
    public ResponseEntity<Long> countAllRequests(){
        return ResponseEntity.ok(adminService.getTotalRequests());
    }

    @GetMapping(path = "/count/user")
    public ResponseEntity<Long> countUser(){
        return ResponseEntity.ok(adminService.getTotalUsers());
    }

    @GetMapping(path = "/count/rider")
    public ResponseEntity<Long> countRider(){
        return ResponseEntity.ok(adminService.getTotalRiders());
    }

    @GetMapping(path = "/count/driver")
    public ResponseEntity<Long> countDriver(){
        return ResponseEntity.ok(adminService.getTotalDrivers());
    }

}
