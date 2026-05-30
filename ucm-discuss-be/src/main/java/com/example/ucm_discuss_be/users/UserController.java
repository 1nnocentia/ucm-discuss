package com.example.ucm_discuss_be.users;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import com.example.ucm_discuss_be.responses.ApiResponse;
import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.threads.ThreadResponseDto;
import com.example.ucm_discuss_be.threads.ThreadService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private ThreadService threadService;

    @GetMapping
    public List<UserResponseDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/me/profile")
    public ResponseEntity<UserProfileDto> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = userDetails.getUsername();
        UserProfileDto response = userService.getUserByEmail(email);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileDto> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody UserCreationDto request) {
        UserModel createdUser = userService.saveUser(request);
        UserResponseDto response = userService.convertToResponse(createdUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long id, @RequestBody UserUpdateDto userDetails) {
        UserModel user = userService.updateUser(id, userDetails);
        UserResponseDto response = userService.convertToResponse(user);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/me/anon")
    public ResponseEntity<ApiResponse<UserResponseDto>> toggleAnonMode(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = userDetails.getUsername();
        UserResponseDto response = userService.toggleAnonMode(email);
        return ResponseEntity.ok(ApiResponse.success(response, "Anonymous mode toggled"));
    }

    // NEW for Card 11
    @GetMapping("/me/viewed-threads")
    public ResponseEntity<ApiResponse<List<ThreadResponseDto>>> getRecentlyVisitedThreads(
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = userDetails.getUsername();
        List<ThreadModel> threads = userService.getRecentlyVisitedThreads(email);
        List<ThreadResponseDto> response = threads.stream()
                .map(threadService::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(response, "Recently visited threads retrieved"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}