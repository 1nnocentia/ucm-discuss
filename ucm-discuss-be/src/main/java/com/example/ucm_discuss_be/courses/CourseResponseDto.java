package com.example.ucm_discuss_be.courses;

// import com.example.ucm_discuss_be.faculties.FacultyResponseDto;
// import com.example.ucm_discuss_be.majors.MajorResponseDto;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonPropertyOrder({
    "id",
    "course_code",
    "course_name",
    "year"
})
public class CourseResponseDto {

    private Long id;
    private String course_code;
    private String course_name;
    private String year;
    
}