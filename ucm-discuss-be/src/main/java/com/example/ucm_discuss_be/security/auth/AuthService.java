package com.example.ucm_discuss_be.security.auth;

import com.example.ucm_discuss_be.security.jwt.JwtService;
// import com.example.ucm_discuss_be.security.auth.LoginRequestDto;
// import com.example.ucm_discuss_be.security.auth.LoginResponseDto;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;
import com.example.ucm_discuss_be.users.UserService;
import com.example.ucm_discuss_be.users.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtService jwtService;
    // private final AuthenticationManager authenticationManager;

    public LoginResponseDto login(LoginRequestDto request) {
        // Authenticate the user (optional, but good practice)
        // authenticationManager.authenticate(
        //     new UsernamePasswordAuthenticationToken(request.getEmail(), "")
        // );

        UserModel user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + request.getEmail()));

        String jwtToken = jwtService.generateToken(user.getEmail());
        UserResponseDto userResponseDto = userService.convertToResponse(user);

        LoginResponseDto.Data data = new LoginResponseDto.Data(jwtToken, userResponseDto);
        return new LoginResponseDto(true, data);
    }
}