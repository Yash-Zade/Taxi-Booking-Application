package com.project.taxibookingapp.services.Impl;

import com.project.taxibookingapp.dto.DriverDto;
import com.project.taxibookingapp.dto.SignupDto;
import com.project.taxibookingapp.dto.UserDto;
import com.project.taxibookingapp.entities.Driver;
import com.project.taxibookingapp.entities.User;
import com.project.taxibookingapp.entities.enums.Role;
import com.project.taxibookingapp.exceptions.ResourceNotFoundException;
import com.project.taxibookingapp.exceptions.RuntimeConflictException;
import com.project.taxibookingapp.repositories.UserRepository;
import com.project.taxibookingapp.security.JWTService;
import com.project.taxibookingapp.services.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final RiderService riderService;
    private final WalletService walletService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final UserService userService;

    @Override
    public String[] login(String email, String password) {
        try{
            Authentication authentication= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
            User user= (User) authentication.getPrincipal();
            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);
            return new String[]{accessToken, refreshToken};
        }catch (Exception e){
            throw new ResourceNotFoundException("Invalid email or password");
        }

    }

    @Override
    @Transactional
    public UserDto signup(SignupDto signupDto) {
        User user=userRepository.findByEmail(signupDto.getEmail())
                .orElse(null);
        if(user != null)
            throw new RuntimeConflictException("The user already exist with email id: "+signupDto.getEmail());

        User mappedUser=modelMapper.map(signupDto,User.class);
        mappedUser.setRoles(Set.of(Role.RIDER));
        mappedUser.setPassword(passwordEncoder.encode(mappedUser.getPassword()));
        User savedUser = userRepository.save(mappedUser);

        riderService.createNewRider(savedUser);

        walletService.cerateNewWallet(savedUser);

        return modelMapper.map(savedUser, UserDto.class);
    }

    @Override
    public String refreshToken(String refreshToken) {

        Long userId = jwtService.getUserIdFromToken(refreshToken);
        User user = userService.getUserById(userId);
        return jwtService.generateAccessToken(user);
    }
}


