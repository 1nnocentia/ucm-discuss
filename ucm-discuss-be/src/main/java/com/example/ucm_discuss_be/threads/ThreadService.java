package com.example.ucm_discuss_be.threads;

import com.example.ucm_discuss_be.courses.CourseModel;
import com.example.ucm_discuss_be.courses.CourseRepository;
import com.example.ucm_discuss_be.courses.CourseService;
import com.example.ucm_discuss_be.exceptions.ResourceNotFoundException;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;
import com.example.ucm_discuss_be.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// import java.util.List;
import java.util.Optional;
// import java.util.stream.Collectors;

@Service
public class ThreadService {

    @Autowired
    private ThreadRepository threadRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CourseService courseService;

    @Transactional(readOnly = true)
    public Page<ThreadResponseDto> getAllThreads(
        Optional<Long> courseId,
        Pageable pageable
    ) {
        Page<ThreadModel> threadsPage;
        if (courseId.isPresent()) {
            threadsPage = threadRepository.findByCourseId(courseId.get(), pageable);
        } else {
            threadsPage = threadRepository.findAll(pageable);
        }
        return threadsPage.map(this::convertToResponse);
    }

    @Transactional(readOnly = true)
    public Optional<ThreadResponseDto> getThreadById(Long id) {
        return threadRepository.findById(id).map(this::convertToResponse);
    }

    @Transactional(readOnly = true)
    public Page<ThreadResponseDto> getThreadsByUserId(Long userId, Pageable pageable) {
        Page<ThreadModel> threadsPage = threadRepository.findByUserId(userId, pageable);
        return threadsPage.map(this::convertToResponse);
    }

    @Transactional
    public ThreadModel saveThread(ThreadCreationDto dto) {
        UserModel user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", dto.getUserId()));
        CourseModel course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course", dto.getCourseId()));

        ThreadModel thread = new ThreadModel();
        thread.setTitle(dto.getTitle());
        thread.setContent(dto.getContent());
        thread.setIs_anon(dto.getIs_anon());
        thread.setUser(user);
        thread.setCourse(course);

        return threadRepository.save(thread);
    }

    @Transactional
    public void deleteThread(Long id) {
        ThreadModel thread = threadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Thread", id));
        threadRepository.delete(thread);
    }

    public boolean isOwner(Long threadId, String email) {
        return threadRepository.findById(threadId)
                .map(thread -> thread.getUser() != null 
                    && email.equals(thread.getUser().getEmail()))
                .orElse(false);
    }

    public ThreadResponseDto convertToResponse(ThreadModel thread) {
        ThreadResponseDto dto = new ThreadResponseDto();
        dto.setId(thread.getId());
        dto.setTitle(thread.getTitle());
        dto.setContent(thread.getContent());
        dto.setVote_count(thread.getVote_count());
        dto.setIs_anon(thread.getIs_anon());
        dto.setCreated_at(thread.getCreated_at());

        if (thread.getUser() != null) {
            dto.setUser(userService.convertToResponse(thread.getUser()));
        }
        if (thread.getCourse() != null) {
            dto.setCourse(courseService.convertToResponse(thread.getCourse()));
        }

        return dto;
    }
}