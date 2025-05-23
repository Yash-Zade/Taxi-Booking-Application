package com.project.taxibookingapp.controllers;

import com.project.taxibookingapp.dto.*;
import com.project.taxibookingapp.services.RiderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "https://cabzilla.vercel.app/")
@RestController
@RequiredArgsConstructor
@RequestMapping(path="/rider")
@Secured("ROLE_RIDER")
public class RiderController {
    private final RiderService riderService;
    @PostMapping(path="/requestRide")
    public ResponseEntity<RideRequestDto> requestRide(@RequestBody RideRequestDto rideRequestDto){
        return ResponseEntity.ok(riderService.requestRide(rideRequestDto));
    }
    @PostMapping(path="/cancelRide/{rideId}")
    public ResponseEntity<RideDto> cancelRide(@PathVariable Long rideId){
        return ResponseEntity.ok(riderService.cancelRide(rideId));
    }
    @PostMapping(path="/rate")
    public ResponseEntity<DriverDto> rateDriver(@RequestBody RatingDto ratingDto){
        return ResponseEntity.ok(riderService.rateDriver(ratingDto.getRideId(),ratingDto.getRating()));
    }
    @GetMapping(path="/getMyProfile")
    public ResponseEntity<RiderDto> getMyProfile(){
        return ResponseEntity.ok(riderService.getMyProfile());
    }
    @GetMapping(path="/getAllRide")
    public ResponseEntity<Page<RideDto>> getAllRide(@RequestParam(defaultValue = "0" ) Integer pageOffset,
                                                    @RequestParam(defaultValue = "10",required = false)Integer pageSize){
        PageRequest pageRequest=PageRequest.of(pageOffset,pageSize, Sort.by(Sort.Direction.DESC,"createdTime","id"));
        return ResponseEntity.ok(riderService.getAllRide(pageRequest));
    }

    @PostMapping("/requestOnboard")
    public ResponseEntity<Void> requestOnboard(@RequestBody OnBoardNewDriverDto OnBoardNewDriverDto){
        return ResponseEntity.ok(riderService.requestOnboard(OnBoardNewDriverDto));
    }
}
