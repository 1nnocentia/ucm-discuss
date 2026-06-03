package com.example.ucm_discuss_be.security.auth;

import com.example.ucm_discuss_be.users.UserLoginResponseDto;
// import com.example.ucm_discuss_be.users.UserResponseDto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDto {
    private boolean success;
    private Data data;

    @lombok.Data
    @AllArgsConstructor
    public static class Data {
        private String token;
        private UserLoginResponseDto user;
    }
}
