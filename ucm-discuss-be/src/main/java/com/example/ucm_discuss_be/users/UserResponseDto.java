package com.example.ucm_discuss_be.users;

import com.example.ucm_discuss_be.faculties.FacultyResponseDto;
import com.example.ucm_discuss_be.majors.MajorResponseDto;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonPropertyOrder({
    "id",
    "nim_or_nisn",
    "name",
    "email",
    "password",
    "is_lecturer",
    "is_anon",
    "major",
    "faculty"
})
public class UserResponseDto {

    private Long id;
    private String nim_or_nisn;
    private String name;
    private String email;
    // private String password;
    private Boolean is_lecturer;
    private Boolean is_anon;
    private MajorResponseDto major;
    private FacultyResponseDto faculty;
}