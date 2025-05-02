package com.project.taxibookingapp.strategies;

import com.project.taxibookingapp.strategies.impl.DriverMatchingHighestRatedDriverStrategy;
import com.project.taxibookingapp.strategies.impl.DriverMatchingNearestDriverStrategy;
import com.project.taxibookingapp.strategies.impl.RideFareDefaultFareCalculationStrategy;
import com.project.taxibookingapp.strategies.impl.RideFareSurgePricingFareCalculationStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Component
@RequiredArgsConstructor
public class RideStrategyManager {

    private final DriverMatchingNearestDriverStrategy nearestDriverStrategy;
    private final DriverMatchingHighestRatedDriverStrategy highestRatedDriverStrategy;
    private final RideFareDefaultFareCalculationStrategy defaultFareCalculationStrategy;
    private final RideFareSurgePricingFareCalculationStrategy surgePricingFareCalculationStrategy;

    public DriverMatchingStrategy driverMatchingStrategy(double riderRating){
        if(riderRating>4.8)
            return highestRatedDriverStrategy;
        else
            return nearestDriverStrategy;
    }

    public RideFareCalculationStrategy rideFareCalculationStrategy(){
        LocalTime surgeStartTime= LocalTime.of(18,0);
        LocalTime surgeEndTime = LocalTime.of(21,0);
        LocalTime currentTime = LocalTime.now();

        boolean surgeTime= currentTime.isAfter(surgeStartTime) && currentTime.isBefore(surgeEndTime);
        if(surgeTime)
            return surgePricingFareCalculationStrategy;
        else
            return defaultFareCalculationStrategy;
    }

}
