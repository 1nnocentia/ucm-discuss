package com.example.ucm_discuss_be.comments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<CommentModel, Long> {

    @Query("SELECT c FROM CommentModel c JOIN FETCH c.user WHERE c.id = :id")
    Optional<CommentModel> findByIdWithUser(@Param("id") Long id);
}