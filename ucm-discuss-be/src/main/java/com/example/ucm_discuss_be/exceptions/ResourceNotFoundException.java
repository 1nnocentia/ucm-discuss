package com.example.ucm_discuss_be.exceptions;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends BusinessException {
    public ResourceNotFoundException(String resourceName, Long id) {
        super(resourceName + " with id " + id + " not found", HttpStatus.NOT_FOUND);
    }
}