package com.example.ucm_discuss_be.threads;

// import java.math.BigInteger;
// import java.security.Timestamp;
// import java.sql.Time;
// import java.util.Objects;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.example.ucm_discuss_be.comments.CommentModel;
import com.example.ucm_discuss_be.courses.CourseModel;
import com.example.ucm_discuss_be.threadAttachments.ThreadAttachmentModel;
import com.example.ucm_discuss_be.userVotesThread.UserVotesThreadModel;
import com.example.ucm_discuss_be.users.UserModel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "threads")
public class ThreadModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // private Long user_id; //Foreign key to users table
    // private Long course_id; //Foreign key to courses table
    private String title;
    private String content;
    private int vote_count; // I believe there's an easier way to count using a seperate table to track users' votes we have created. But I don't know how to utilise it optimally on Spring Boot yet. Since this should be easy
    private boolean is_anon;

    @ManyToOne (cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private UserModel user; // Many threads belong to one user

    @ManyToOne (cascade = CascadeType.ALL)
    @JoinColumn(name = "course_id")
    private CourseModel course; // Many threads belong to one course

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL)
    private List<CommentModel> comments; // One thread can have many comments

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL)
    private List<UserVotesThreadModel> user_votes_threads; // One thread can have many votes

    @OneToOne(mappedBy = "thread", cascade = CascadeType.ALL)
    private ThreadAttachmentModel thread_attachment; // One thread can have one attachment  

    @ManyToMany(mappedBy = "viewed_threads", cascade = CascadeType.ALL)
    private List<UserModel> viewers; // Many users can view many threads

    @CreationTimestamp
    private LocalDateTime created_at;
}
