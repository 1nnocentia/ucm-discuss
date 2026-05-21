package com.example.ucm_discuss_be.userVotesComment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserVotesCommentRepository extends JpaRepository<UserVotesCommentModel, Long> {
    Optional<UserVotesCommentModel> findByUserIdAndCommentId(Long userId, Long commentId);
}