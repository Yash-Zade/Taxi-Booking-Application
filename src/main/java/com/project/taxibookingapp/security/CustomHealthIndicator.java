package com.project.taxibookingapp.security;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        // Custom health check logic
        boolean isHealthy = checkHealth();
        if (isHealthy) {
            return Health.up().build();
        } else {
            return Health.down().withDetail("Error", "health check failed").build();
        }
    }

    private boolean checkHealth() {
        // Implement your health check logic here
        return true;
    }
}
