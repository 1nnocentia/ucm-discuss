package com.example.ucm_discuss_be.userVotesThread;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserVotesThreadRepository extends JpaRepository<UserVotesThreadModel, Long> {
    Optional<UserVotesThreadModel> findByUserIdAndThreadId(Long userId, Long threadId);
}