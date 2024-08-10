package com.project.taxibookingapp.exceptions;

public class RuntimeConflictException extends RuntimeException{

    public RuntimeConflictException() {
    }

    public RuntimeConflictException(String message) {
        super(message);
    }
}
