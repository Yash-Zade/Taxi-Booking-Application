package com.project.taxibookingapp.configs;

import com.project.taxibookingapp.dto.PointDto;
import com.project.taxibookingapp.utils.GeometryUtil;
import org.locationtech.jts.geom.Point;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {

    @Bean
    public static ModelMapper modelMapper(){
        ModelMapper mapper= new ModelMapper();

        mapper.typeMap(PointDto.class, Point.class).setConverter(context -> {
            PointDto pointDto= context.getSource();
            return GeometryUtil.creatPoint(pointDto);
        });

        mapper.typeMap(Point.class, PointDto.class).setConverter(context ->{
            Point point = context.getSource();
            double[] coordiantes={
                    point.getX(),
                    point.getY()
            };
            return new PointDto(coordiantes);
        });
        return mapper;
    }
}
