package com.example.ucm_discuss_be.users;

// import java.math.BigInteger;
// import java.security.Timestamp;
// import java.sql.Time;
// import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.example.ucm_discuss_be.comments.CommentModel;
import com.example.ucm_discuss_be.courses.CourseModel;
import com.example.ucm_discuss_be.faculties.FacultyModel;
import com.example.ucm_discuss_be.majors.MajorModel;
import com.example.ucm_discuss_be.notifications.NotificationModel;
import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.userVotesComment.UserVotesCommentModel;
import com.example.ucm_discuss_be.userVotesThread.UserVotesThreadModel;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")

public class UserModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nim_or_nisn;
    private String name;
    private String email;
    private String password;
    private Boolean is_lecturer;

    @ManyToOne (cascade = CascadeType.ALL)
    @JoinColumn(name = "major_id")
    private MajorModel major; //Many students - same major
    
    @ManyToOne (cascade = CascadeType.ALL)
    @JoinColumn(name = "faculty_id")
    private FacultyModel faculty; //Many students - same faculty

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<NotificationModel> notifications; //One user can have many notifications

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ThreadModel> created_threads; //One user can create many threads

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CommentModel> comments; //One user can create many comments

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserVotesThreadModel> voted_threads; //One user can vote many threads

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserVotesCommentModel> voted_comments; //One user can downvote many threads

    @ManyToMany (cascade = CascadeType.ALL)
    @JoinTable(
        name = "user_course",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "course_id", referencedColumnName = "id")
    )
    private List<CourseModel> courses; //One user can follow many courses

    @ManyToMany (cascade = CascadeType.ALL)
    @JoinTable(
        name = "user_views_thread",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "thread_id", referencedColumnName = "id")
    )
    private List<ThreadModel> viewed_threads; //One user can view many threads

    @CreationTimestamp
    private LocalDateTime created_at;
}
