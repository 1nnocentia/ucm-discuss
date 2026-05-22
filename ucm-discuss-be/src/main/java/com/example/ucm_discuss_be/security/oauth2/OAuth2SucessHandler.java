package com.example.ucm_discuss_be.security.oauth2;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import com.example.ucm_discuss_be.security.auth.AuthService;
import com.example.ucm_discuss_be.security.auth.LoginRequestDto;
import com.fasterxml.jackson.databind.ObjectMapper;



@Component
@RequiredArgsConstructor
public class OAuth2SucessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final AuthService authService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, 
                                        HttpServletResponse response, 
                                        Authentication authentication) throws IOException, ServletException {
        
        // 1. Extract the principal user from the authentication object
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        
        // 2. Extract the user's Google email address
        String email = oAuth2User.getAttribute("email");
        
        LoginRequestDto loginRequest = new LoginRequestDto();
        loginRequest.setEmail(email);
        
        try {
            String jsonResponse = objectMapper.writeValueAsString(authService.login(loginRequest));
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(jsonResponse);
            response.getWriter().flush();
        } catch (Exception e) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            String errorResponse = String.format("{\"success\": false, \"message\": \"%s\"}", e.getMessage());
            response.getWriter().write(errorResponse);
            response.getWriter().flush();
        }
        // response.setContentType("application/json");
        // response.setCharacterEncoding("UTF-8");
        // response.setStatus(HttpServletResponse.SC_OK);

        // objectMapper.writeValueAsString(loginRequest);

        
       

        // 3. For backend-only isolation testing: 
        // We will write the email directly to the HTTP response body so it prints on your browser screen!
        // response.setContentType("application/json");
        // response.setCharacterEncoding("UTF-8");
        // response.setStatus(HttpServletResponse.SC_OK);
        
        // String jsonResponse = String.format("{\n  \"success\": true,\n  \"message\": \"Google OAuth2 successful! Use this email in Postman to hit your custom login route.\",\n  \"email\": \"%s\"\n}", email);
        
        // response.getWriter().write(jsonResponse);
        // response.getWriter().flush();
    }
}
