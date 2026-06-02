package com.example.ucm_discuss_be.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.HandlerExceptionResolver;

import com.example.ucm_discuss_be.exceptions.BusinessException;
import com.example.ucm_discuss_be.security.jwt.JwtAuthFilter;
import com.example.ucm_discuss_be.security.oauth2.OAuth2SucessHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
@Profile("!dev")
public class SecurityConfig {
    private final JwtAuthFilter jwtAuthFilter;
    private final OAuth2SucessHandler oAuth2SuccessHandler;

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver exceptionResolver;

    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //     http
    //         .csrf(AbstractHttpConfigurer::disable)
    //         .authorizeHttpRequests(req ->
    //             req.requestMatchers("/api/auth/**").permitAll()
    //                .anyRequest().authenticated()
    //         )
    //         .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    //         .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    //     return http.build();
    // }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)

            .exceptionHandling(exceptions -> exceptions
                .authenticationEntryPoint((request, response, authException) -> {
                    // We throw your BusinessException here!
                    exceptionResolver.resolveException(
                        request, 
                        response, 
                        null, 
                        new BusinessException("Unauthorized", HttpStatus.UNAUTHORIZED)
                    );
                })
            )

            .authorizeHttpRequests(req ->
                req.requestMatchers("/api/auth/**").permitAll()
                //    .anyRequest().authenticated()
                .anyRequest().permitAll() // TOLONG HAPUS INI NANTI
            )
            .oauth2Login(oauth2 -> oauth2
                .successHandler(oAuth2SuccessHandler)
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
            // .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // TOLONG DI UNCOMMENT!!!

        return http.build();
    }


    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //     http
    //         .csrf(AbstractHttpConfigurer::disable)
    //         .authorizeHttpRequests(req ->
    //             req.requestMatchers("/api/auth/**").permitAll()
    //                .anyRequest().authenticated()
    //         )
    //         .oauth2Login(oauth2 -> oauth2
    //             .successHandler(oAuth2SuccessHandler)
    //         )
    //         .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    //     return http.build();
    // }

    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //     http.authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
    //         .oauth2Login(Customizer.withDefaults());
    //     return http.build();
    // }
}
