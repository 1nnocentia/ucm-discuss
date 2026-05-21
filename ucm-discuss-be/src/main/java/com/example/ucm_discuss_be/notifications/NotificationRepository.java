package com.example.ucm_discuss_be.notifications;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationModel, Long> {

    @Query("SELECT n FROM NotificationModel n JOIN FETCH n.comment c JOIN FETCH c.thread WHERE n.user.id = :userId ORDER BY n.created_at DESC")
    List<NotificationModel> findByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);

    @Query("SELECT COUNT(n) FROM NotificationModel n WHERE n.user.id = :userId AND n.is_read = false")
    long countUnreadByUserId(@Param("userId") Long userId);
}