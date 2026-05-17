package com.example.ucm_discuss_be.users;

import com.example.ucm_discuss_be.faculties.FacultyResponseDto;
import com.example.ucm_discuss_be.majors.MajorResponseDto;
// import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateDto {
    private String nim_or_nisn;
    private String name;
    private String email;
    private Boolean is_lecturer;
    private Boolean is_anon;
    private MajorResponseDto major;
    private FacultyResponseDto faculty;
}