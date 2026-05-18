package com.example.ucm_discuss_be.exceptions;

import org.springframework.http.HttpStatus;

public class AiServiceUnavailableException extends BusinessException {
    public AiServiceUnavailableException() {
        super("AI service is temporarily unavailable. Please try again later.", 
              HttpStatus.SERVICE_UNAVAILABLE);
    }
}