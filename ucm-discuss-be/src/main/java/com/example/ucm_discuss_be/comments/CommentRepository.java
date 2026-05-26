package com.example.ucm_discuss_be.comments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<CommentModel, Long> {

    @Query("SELECT c FROM CommentModel c WHERE c.thread.id = :threadId")
    List<CommentModel> findByThreadId(@Param("threadId") Long threadId);

    @Query("SELECT c FROM CommentModel c WHERE c.thread.id = :threadId ORDER BY c.vote_count DESC")
    List<CommentModel> findByThreadIdOrderByVoteCountDesc(@Param("threadId") Long threadId);

    // NEW for Card 7
    @Query("SELECT c FROM CommentModel c WHERE c.user.id = :userId")
    List<CommentModel> findByUserId(@Param("userId") Long userId);

    @Query("SELECT c FROM CommentModel c JOIN FETCH c.user WHERE c.id = :id")
    Optional<CommentModel> findByIdWithUser(@Param("id") Long id);
}