package com.example.ucm_discuss_be.courses;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.annotation.AuthenticationPrincipal;
// import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<CourseResponseDto> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponseDto> getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    // Example: POST /api/courses with JSON body { "course_code": "CS101", "course_name": "Introduction to Computer Science", "year": 2023 }
    public ResponseEntity<CourseResponseDto> createCourse(@Valid @RequestBody CourseCreationDto request) {
        // Call your service to create the course, passing the DTO
        CourseModel createdCourse = courseService.saveCourse(request);
        CourseResponseDto response = courseService.convertToResponse(createdCourse); // Convert to DTO
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    // public UserModel createUser(@RequestBody UserModel user) {
    //     return userService.saveUser(user);
    // }

    @PatchMapping("/{id}")
    // Example: PATCH /api/courses/1 with JSON body { "course_code": "CS102", "course_name": "Data Structures", "year": 2023 }
    public ResponseEntity<CourseResponseDto> updateCourse(@PathVariable Long id, @RequestBody CourseUpdateDto courseDetails) {
        CourseModel course = courseService.updateCourse(id, courseDetails);
        CourseResponseDto response = courseService.convertToResponse(course);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    // Example: DELETE /api/courses/1
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}
