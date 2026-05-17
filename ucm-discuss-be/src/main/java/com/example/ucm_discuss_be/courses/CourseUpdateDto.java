package com.example.ucm_discuss_be.courses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseUpdateDto {
    private String course_code;
    private String course_name;
    private String year;
}
