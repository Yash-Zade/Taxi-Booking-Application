package com.project.taxibookingapp.services.Impl;

import com.project.taxibookingapp.services.DistanceService;
import lombok.Data;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class DistanceServiceImpl implements DistanceService {
    private static final String OSRM_API_BASE_URL="http://router.project-osrm.org/route/v1/driving/";
    @Override
    public double calculateDistance(Point src, Point dest) {

        try{
            String uri = src.getX()+","+src.getY()+";"+dest.getX()+","+dest.getY();
            OsrmResponseDto responseDto = RestClient.builder()
                    .baseUrl(OSRM_API_BASE_URL)
                    .build()
                    .get()
                    .uri(uri)
                    .retrieve()
                    .body(OsrmResponseDto.class);
            return responseDto.getRoutes().getFirst().getDistance()/1000;
        }catch (Exception e){
            throw new RuntimeException("Error getting message from OSRM : "+e.getMessage());
        }

    }
}
@Data
class OsrmResponseDto{
    private List<OsrmRoutes> routes;
}
@Data
class OsrmRoutes{
    private Double distance;
}