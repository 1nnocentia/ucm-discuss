package com.example.ucm_discuss_be.security.auth;

import com.example.ucm_discuss_be.exceptions.BusinessException;
import com.example.ucm_discuss_be.security.jwt.JwtService;
import com.example.ucm_discuss_be.users.UserLoginResponseDto;
// import com.example.ucm_discuss_be.security.auth.LoginRequestDto;
// import com.example.ucm_discuss_be.security.auth.LoginResponseDto;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;
import com.example.ucm_discuss_be.users.UserService;
import com.example.ucm_discuss_be.users.UserResponseDto;
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
        UserLoginResponseDto userLoginDto = userService.convertToLoginResponse(user);

        LoginResponseDto.Data data = new LoginResponseDto.Data(jwtToken, userLoginDto);
        return new LoginResponseDto(true, data);
    }
}