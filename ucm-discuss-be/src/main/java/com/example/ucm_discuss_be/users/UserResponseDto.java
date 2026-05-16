package com.example.ucm_discuss_be.users;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDto {

    private Long id;
    private String nim_or_nisn;
    private String name;
    private String email;
    // private String password;
    private Boolean is_lecturer;
    private Boolean is_anon;
    private Long major_id;
    private Long faculty_id;
}