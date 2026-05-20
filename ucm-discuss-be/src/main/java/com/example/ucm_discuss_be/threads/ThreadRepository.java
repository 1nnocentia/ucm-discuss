package com.example.ucm_discuss_be.threads;

// import org.springframework.boot.data.autoconfigure.web.DataWebProperties.Pageable;
// import org.springframework.boot.data.autoconfigure.web.DataWebProperties.Pageable;
// import org.hibernate.query.Page;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
// import java.util.List;
// import com.example.ucm_discuss_be.courses.CourseModel;


@Repository
public interface ThreadRepository extends JpaRepository<ThreadModel, Long> {
    Page<ThreadModel> findByCourseId(Long id, Pageable pageable);
    Page<ThreadModel> findByUserId(Long id, Pageable pageable);
}