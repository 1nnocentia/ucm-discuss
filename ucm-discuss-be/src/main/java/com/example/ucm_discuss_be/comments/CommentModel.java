package com.example.ucm_discuss_be.comments;

import java.time.LocalDateTime;
import java.util.List;

// import java.math.BigInteger;
// import java.security.Timestamp;
// import java.sql.Time;
// import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;

import com.example.ucm_discuss_be.commentAttachments.CommentAttachmentModel;
import com.example.ucm_discuss_be.notifications.NotificationModel;
import com.example.ucm_discuss_be.replies.ReplyModel;
import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.userVotesComment.UserVotesCommentModel;
import com.example.ucm_discuss_be.users.UserModel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "comments")

public class CommentModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // private Long thread_id; //Foreign key to threads table
    // private Long user_id; //Foreign key to users table
    private String content;
    private int vote_count;
    private Boolean asked_ai;
    private Boolean is_anon;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user; // Many comments belong to one user

    @ManyToOne
    @JoinColumn(name = "thread_id")
    private ThreadModel thread; // Many comments belong to one thread

    @OneToMany(mappedBy = "comment")
    private List<UserVotesCommentModel> user_votes_comments; // One comment can have many votes

    @OneToMany(mappedBy = "comment")
    private List<NotificationModel> notifications; // One comment can have many notifications

    @OneToOne(mappedBy = "comment")
    private CommentAttachmentModel comment_attachment; // One comment can have one attachment

    // Reply transient table relationship
    @OneToOne(mappedBy = "comment")
    private ReplyModel source_reply; // One comment can be a reply to one comment

    @OneToMany(mappedBy = "comment")
    private List<ReplyModel> parent_replies; // One comment can have many replies

    @CreationTimestamp
    private LocalDateTime created_at;
}
