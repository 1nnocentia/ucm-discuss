package com.example.ucm_discuss_be.security.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ucm_discuss_be.security.jwt.TokenBlacklistService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final TokenBlacklistService tokenBlacklistService;

    // @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto request) {
        return ResponseEntity.ok(authService.login(request));
    }

    // @PostMapping("/demo-login")
    public ResponseEntity<LoginResponseDto> demoLogin(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        System.out.println("REQUEST DEMO LOGIN MASUK! EMAIL: " + email);
        return ResponseEntity.ok(authService.demoLogin(email));
    }

    // @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")  // Require authentication
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenBlacklistService.blacklistToken(token);
        }
        
        return ResponseEntity.ok(Map.of(
            "message", "Logged out successfully",
            "success", "true"
        ));
    }
}