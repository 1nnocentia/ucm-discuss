package com.example.ucm_discuss_be.security.auth;

import com.example.ucm_discuss_be.exceptions.BusinessException;
import com.example.ucm_discuss_be.security.jwt.JwtService;
import com.example.ucm_discuss_be.users.UserLoginDto;
// import com.example.ucm_discuss_be.security.auth.LoginRequestDto;
// import com.example.ucm_discuss_be.security.auth.LoginResponseDto;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;
import com.example.ucm_discuss_be.users.UserService;
import lombok.RequiredArgsConstructor;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtService jwtService;
    // BusinessException businessException = 
    // private final AuthenticationManager authenticationManager;

    @Transactional(readOnly = true)
    public LoginResponseDto login(LoginRequestDto request) {
        // Authenticate the user (optional, but good practice)
        // authenticationManager.authenticate(
        //     new UsernamePasswordAuthenticationToken(request.getEmail(), "")
        // );

        UserModel user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException("You are not registered in our app yet.", org.springframework.http.HttpStatus.BAD_REQUEST));

        String jwtToken = jwtService.generateToken(user.getEmail());
        UserLoginDto userLoginDto = userService.convertToLoginResponse(user);

        LoginResponseDto.Data data = new LoginResponseDto.Data(jwtToken, userLoginDto);
        return new LoginResponseDto(true, data);
    }

    @Transactional(readOnly = true)
    public LoginResponseDto demoLogin(String email) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Demo email not found.", org.springframework.http.HttpStatus.NOT_FOUND));

        String jwtToken = jwtService.generateToken(user.getEmail());

        UserLoginDto userLoginDto = userService.convertToLoginResponse(user);

        LoginResponseDto.Data data = new LoginResponseDto.Data(jwtToken, userLoginDto);
        return new LoginResponseDto(true, data);
    }

    @Transactional(readOnly = true)
    public LoginResponseDto loginWithGoogle(String idToken) {
        try {
            org.springframework.security.oauth2.jwt.NimbusJwtDecoder jwtDecoder = 
                org.springframework.security.oauth2.jwt.NimbusJwtDecoder.withJwkSetUri("https://www.googleapis.com/oauth2/v3/certs").build();
            org.springframework.security.oauth2.jwt.Jwt jwt = jwtDecoder.decode(idToken);
            
            String issuer = jwt.getClaimAsString("iss");
            if (issuer == null || (!issuer.equals("https://accounts.google.com") && !issuer.equals("accounts.google.com"))) {
                throw new BusinessException("Invalid issuer", org.springframework.http.HttpStatus.BAD_REQUEST);
            }
            
            String email = jwt.getClaimAsString("email");
            if (email == null || email.isBlank()) {
                throw new BusinessException("Email not found in token", org.springframework.http.HttpStatus.BAD_REQUEST);
            }

            UserModel user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new BusinessException("You are not registered in our app yet.", org.springframework.http.HttpStatus.BAD_REQUEST));

            String jwtToken = jwtService.generateToken(user.getEmail());
            UserLoginDto userLoginDto = userService.convertToLoginResponse(user);

            LoginResponseDto.Data data = new LoginResponseDto.Data(jwtToken, userLoginDto);
            return new LoginResponseDto(true, data);
        } catch (org.springframework.security.oauth2.jwt.JwtException e) {
            throw new BusinessException("Invalid Google token: " + e.getMessage(), org.springframework.http.HttpStatus.BAD_REQUEST);
        }
    }
}