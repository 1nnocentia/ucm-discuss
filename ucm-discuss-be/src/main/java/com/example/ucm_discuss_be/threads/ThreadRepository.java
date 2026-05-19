package com.example.ucm_discuss_be.threads;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
// import com.example.ucm_discuss_be.courses.CourseModel;


@Repository
public interface ThreadRepository extends JpaRepository<ThreadModel, Long> {
    List<ThreadModel> findByCourseId(Long id);
}