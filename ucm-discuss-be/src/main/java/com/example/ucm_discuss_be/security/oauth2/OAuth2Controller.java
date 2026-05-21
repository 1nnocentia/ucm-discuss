package com.example.ucm_discuss_be.security.oauth2;

import com.example.ucm_discuss_be.security.auth.LoginResponseDto;
import com.example.ucm_discuss_be.security.jwt.JwtService;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;
import com.example.ucm_discuss_be.users.UserService;
import com.example.ucm_discuss_be.users.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth2")
@RequiredArgsConstructor
public class OAuth2Controller {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping("/success")
    public ResponseEntity<LoginResponseDto> handleOAuth2Success() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            
            if (authentication == null) {
                throw new RuntimeException("Authentication not found in SecurityContext");
            }
            
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String email = oAuth2User.getAttribute("email");
            
            System.out.println("OAuth2User attributes: " + oAuth2User.getAttributes());
            System.out.println("Email extracted: " + email);

            UserModel user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

            String jwtToken = jwtService.generateToken(email);
            UserResponseDto userResponseDto = userService.convertToResponse(user);

            LoginResponseDto.Data data = new LoginResponseDto.Data(jwtToken, userResponseDto);
            return ResponseEntity.ok(new LoginResponseDto(true, data));
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    // @GetMapping("/success")
    // public ResponseEntity<LoginResponseDto> handleOAuth2Success(Authentication authentication) {
    //     OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
    //     String email = oAuth2User.getAttribute("email");

    //     // Check if user exists in database
    //     UserModel user = userRepository.findByEmail(email)
    //             .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

    //     // Generate JWT token
    //     String jwtToken = jwtService.generateToken(email);
    //     UserResponseDto userResponseDto = userService.convertToResponse(user);

    //     // Return token and user data
    //     LoginResponseDto.Data data = new LoginResponseDto.Data(jwtToken, userResponseDto);
    //     return ResponseEntity.ok(new LoginResponseDto(true, data));
    // }
}