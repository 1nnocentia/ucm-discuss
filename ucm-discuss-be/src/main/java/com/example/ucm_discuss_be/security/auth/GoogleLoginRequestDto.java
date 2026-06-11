package com.example.ucm_discuss_be.security.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GoogleLoginRequestDto {
    @NotBlank(message = "ID Token is required")
    private String idToken;
}
