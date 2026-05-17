package com.example.ucm_discuss_be.courses;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



// import com.example.ucm_discuss_be.majors.UserModel;
// import com.example.ucm_discuss_be.majors.UserRepository;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public List<CourseResponseDto> getAllCourses() {
        List<CourseModel> courses = courseRepository.findAll();
        List<CourseResponseDto> responseList = new ArrayList<>();
        for (CourseModel course : courses) {
            responseList.add(convertToResponse(course));
        }
        return responseList;
        // return users;
    }

    public Optional<CourseResponseDto> getCourseById(Long id) {
        Optional<CourseModel> courseOpt = courseRepository.findById(id);
        if (courseOpt != null && courseOpt.isPresent()) {
            CourseResponseDto response = convertToResponse(courseOpt.get());
            return Optional.of(response);
        }
        return Optional.empty();
        // UserResponseDto response = convertToResponse(userOpt.orElse(null));
        // return Optional.of(response);
        // return userRepository.findById(id);
    }

    public CourseModel saveCourse(CourseCreationDto request) {
        CourseModel course = new CourseModel();
        course.setCourse_code(request.getCourse_code());
        course.setCourse_name(request.getCourse_name());
        course.setYear(request.getYear());
        return courseRepository.save(course);
    }

    public CourseResponseDto convertToResponse(CourseModel course) {
        CourseResponseDto response = new CourseResponseDto();
        response.setId(course.getId());
        response.setCourse_code(course.getCourse_code());
        response.setCourse_name(course.getCourse_name());
        response.setYear(course.getYear());

        return response;
    }

    public CourseModel updateCourse(Long id, CourseModel courseDetails) {
        CourseModel course = courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
        course.setCourse_code(courseDetails.getCourse_code());
        course.setCourse_name(courseDetails.getCourse_name());
        course.setYear(courseDetails.getYear());
        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}
