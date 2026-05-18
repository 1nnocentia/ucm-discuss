package com.example.ucm_discuss_be.threads;

import com.example.ucm_discuss_be.courses.CourseModel;
import com.example.ucm_discuss_be.courses.CourseRepository;
import com.example.ucm_discuss_be.courses.CourseService;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;
import com.example.ucm_discuss_be.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ThreadService {

    @Autowired
    private ThreadRepository threadRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private UserService userService; // For converting user to DTO
    @Autowired
    private CourseService courseService; // For converting course to DTO

    @Transactional(readOnly = true)
    public List<ThreadResponseDto> getAllThreads() {
        return threadRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<ThreadResponseDto> getThreadById(Long id) {
        return threadRepository.findById(id).map(this::convertToResponse);
    }

    @Transactional
    public ThreadModel saveThread(ThreadCreationDto dto) {
        UserModel user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getUserId()));
        CourseModel course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + dto.getCourseId()));

        ThreadModel thread = new ThreadModel();
        thread.setTitle(dto.getTitle());
        thread.setContent(dto.getContent());
        thread.setIs_anon(dto.getIs_anon());
        thread.setUser(user);
        thread.setCourse(course);
        // vote_count defaults to 0

        return threadRepository.save(thread);
    }

    @Transactional
    public void deleteThread(Long id) {
        if (!threadRepository.existsById(id)) {
            throw new RuntimeException("Thread not found with id: " + id);
        }
        threadRepository.deleteById(id);
    }

    public ThreadResponseDto convertToResponse(ThreadModel thread) {
        ThreadResponseDto dto = new ThreadResponseDto();
        dto.setId(thread.getId());
        dto.setTitle(thread.getTitle());
        dto.setContent(thread.getContent());
        dto.setVote_count(thread.getVote_count());
        dto.setIs_anon(thread.getIs_anon());
        dto.setCreated_at(thread.getCreated_at());

        // Convert nested entities to their respective DTOs
        if (thread.getUser() != null) {
            dto.setUser(userService.convertToResponse(thread.getUser()));
        }
        if (thread.getCourse() != null) {
            dto.setCourse(courseService.convertToResponse(thread.getCourse()));
        }

        return dto;
    }
}