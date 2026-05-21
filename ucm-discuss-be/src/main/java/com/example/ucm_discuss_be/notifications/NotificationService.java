package com.example.ucm_discuss_be.notifications;

import com.example.ucm_discuss_be.comments.CommentModel;
import com.example.ucm_discuss_be.users.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Transactional(readOnly = true)
    public List<NotificationResponseDto> getMyNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public long getUnreadCount(Long userId) {
        return notificationRepository.countUnreadByUserId(userId);
    }

    @Transactional
    public NotificationModel createNotification(UserModel recipient, CommentModel comment) {
        NotificationModel notification = new NotificationModel();
        notification.setUser(recipient);
        notification.setComment(comment);
        notification.setIs_read(false);
        return notificationRepository.save(notification);
    }

    @Transactional
    public NotificationResponseDto markAsRead(Long notificationId, Long userId) {
        NotificationModel notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        if (!notification.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        notification.setIs_read(true);
        return convertToResponse(notificationRepository.save(notification));
    }

    public NotificationResponseDto convertToResponse(NotificationModel notification) {
        NotificationResponseDto dto = new NotificationResponseDto();
        dto.setId(notification.getId());
        dto.setIs_read(notification.getIs_read());
        dto.setCreated_at(notification.getCreated_at());

        if (notification.getComment() != null) {
            dto.setComment_id(notification.getComment().getId());
            if (notification.getComment().getThread() != null) {
                dto.setThread_title(notification.getComment().getThread().getTitle());
                dto.setThread_id(notification.getComment().getThread().getId());
            }
        }

        // Build human-readable message
        String commenterName = "Someone";
        if (notification.getComment() != null && notification.getComment().getUser() != null) {
            Boolean isAnon = notification.getComment().getIs_anon();
            if (!Boolean.TRUE.equals(isAnon)) {
                commenterName = notification.getComment().getUser().getName();
            }
        }
        dto.setMessage(commenterName + " replied to your thread");

        return dto;
    }
}