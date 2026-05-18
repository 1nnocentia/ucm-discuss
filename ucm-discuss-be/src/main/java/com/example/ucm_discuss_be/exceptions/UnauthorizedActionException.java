package com.example.ucm_discuss_be.exceptions;

import org.springframework.http.HttpStatus;

public class UnauthorizedActionException extends BusinessException {
    public UnauthorizedActionException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }
}