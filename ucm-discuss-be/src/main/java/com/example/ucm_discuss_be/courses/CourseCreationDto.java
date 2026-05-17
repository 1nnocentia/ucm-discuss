package com.example.ucm_discuss_be.courses;

// import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseCreationDto {

    @NotBlank(message = "Course code is required")
    @Size(min = 2, max = 20)
    private String course_code;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 255)
    private String course_name;

    @NotBlank(message = "Year is required")
    @Pattern(regexp = "^[0-9]{4}$")
    private String year;
}