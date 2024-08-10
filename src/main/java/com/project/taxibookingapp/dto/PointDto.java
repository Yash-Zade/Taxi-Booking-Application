package com.project.taxibookingapp.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PointDto {
    private double[] coordinates;
    private String type ="Point";

    public PointDto(double[] coordiantes) {
        this.coordinates = coordiantes;
    }
}
