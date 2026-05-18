package com.example.ucm_discuss_be.exceptions;

import org.springframework.http.HttpStatus;

public class InvalidFileException extends BusinessException {
    public InvalidFileException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}