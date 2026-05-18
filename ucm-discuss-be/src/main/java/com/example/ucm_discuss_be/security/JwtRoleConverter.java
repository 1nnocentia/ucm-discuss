package com.example.ucm_discuss_be.security;

import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtRoleConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final UserRepository userRepository;

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        String email = jwt.getClaimAsString("email");

        // Look up user in DB to get the real role
        String role = userRepository.findByEmail(email)
                .map(UserModel::getIs_lecturer)
                .filter(Boolean::booleanValue)
                .map(isLecturer -> "ROLE_DOSEN")
                .orElse("ROLE_MAHASISWA");

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role));

        // Email becomes the principal name for @AuthenticationPrincipal and SpEL
        return new JwtAuthenticationToken(jwt, authorities, email);
    }
}