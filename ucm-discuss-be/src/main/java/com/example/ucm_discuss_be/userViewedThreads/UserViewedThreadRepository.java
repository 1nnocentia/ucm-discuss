package com.example.ucm_discuss_be.userViewedThreads;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserViewedThreadRepository extends JpaRepository<UserViewedThreadModel, Long> {
    Optional<UserViewedThreadModel> findByUserIdAndThreadId(Long userId, Long threadId);

    @Query("SELECT v FROM UserViewedThreadModel v JOIN FETCH v.thread WHERE v.user.id = :userId ORDER BY v.viewed_at DESC")
    List<UserViewedThreadModel> findRecentlyViewedByUserId(@Param("userId") Long userId);
}