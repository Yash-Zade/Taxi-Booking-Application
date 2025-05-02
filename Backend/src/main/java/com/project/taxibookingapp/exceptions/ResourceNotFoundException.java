package com.project.taxibookingapp.exceptions;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException() {
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
