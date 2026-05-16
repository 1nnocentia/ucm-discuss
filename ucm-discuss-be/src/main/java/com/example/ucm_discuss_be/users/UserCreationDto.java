package com.example.ucm_discuss_be.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreationDto {

    @NotBlank(message = "NIM or NISN is required")
    @Size(min = 5, max = 50)
    private String nim_or_nisn;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 255)
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 255)
    private String password;

    private Boolean is_lecturer = false;

    private Boolean is_anon = false;

    private Long major_id;
    private Long faculty_id;
}