package com.project.taxibookingapp.services.Impl;

import com.project.taxibookingapp.dto.DriverDto;
import com.project.taxibookingapp.dto.SignupDto;
import com.project.taxibookingapp.dto.UserDto;
import com.project.taxibookingapp.entities.Rider;
import com.project.taxibookingapp.entities.User;
import com.project.taxibookingapp.entities.enums.Role;
import com.project.taxibookingapp.exceptions.RuntimeConflictException;
import com.project.taxibookingapp.repositories.UserRepository;
import com.project.taxibookingapp.services.AuthService;
import com.project.taxibookingapp.services.RiderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final RiderService riderService;

    @Override
    public String login(String email, String Password) {
        return "";
    }

    @Override
    public UserDto signup(SignupDto signupDto) {
        User user=userRepository.findByEmail(signupDto.getEmail())
                .orElse(null);
        if(user != null)
            throw new RuntimeConflictException("The user already exist with email id: "+signupDto.getEmail());

        User mappedUser=modelMapper.map(signupDto,User.class);
        mappedUser.setRoles(Set.of(Role.RIDER));
        User savedUser = userRepository.save(mappedUser);

        riderService.createNewRider(savedUser);

        //TODO Add Wallet Service.

        return modelMapper.map(savedUser, UserDto.class);
    }

    @Override
    public DriverDto onboardNewDriver(String userId) {
        return null;
    }
}
