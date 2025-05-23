package com.project.taxibookingapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OnBoardNewDriverDto {

    private Long id;
    private UserDto user;
    private String vehicleId;

}
