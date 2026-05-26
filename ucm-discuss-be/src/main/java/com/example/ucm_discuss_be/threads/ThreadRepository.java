package com.example.ucm_discuss_be.threads;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ThreadRepository extends JpaRepository<ThreadModel, Long> {
    Page<ThreadModel> findByCourseId(Long id, Pageable pageable);
    Page<ThreadModel> findByUserId(Long id, Pageable pageable);

    // NEW for Card 11
    List<ThreadModel> findByUserId(Long id);

    @Query("SELECT t FROM ThreadModel t " +
           "WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(t.content) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<ThreadModel> searchByTitleOrContent(@Param("query") String query, Pageable pageable);

    @Query("SELECT t FROM ThreadModel t JOIN FETCH t.user WHERE t.id = :id")
    Optional<ThreadModel> findByIdWithUser(@Param("id") Long id);
}