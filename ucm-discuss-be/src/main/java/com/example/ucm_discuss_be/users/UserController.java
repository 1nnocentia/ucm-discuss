package com.example.ucm_discuss_be.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserResponseDto> getAllUsers() {
        return userService.getAllUsers();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    // Example: POST /api/users with JSON body { "name": "John Doe", "email": "john.doe@example.com" }
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody UserCreationDto request) {
        // Call your service to create the user, passing the DTO
        UserModel createdUser = userService.saveUser(request);
        UserResponseDto response = userService.convertToResponse(createdUser); // Convert to DTO
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    // public UserModel createUser(@RequestBody UserModel user) {
    //     return userService.saveUser(user);
    // }

    @PatchMapping("/{id}")
    // Example: PATCH /api/users/1 with JSON body { "name": "Updated User Name", "email": "updated.email@example.com" }
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long id, @Valid @RequestBody UserModel userDetails) {
        UserModel user = userService.updateUser(id, userDetails);
        UserResponseDto response = userService.convertToResponse(user);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    // Example: DELETE /api/users/1
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
