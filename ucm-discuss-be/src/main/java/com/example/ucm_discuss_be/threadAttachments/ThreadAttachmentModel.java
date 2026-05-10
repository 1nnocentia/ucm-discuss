package com.example.ucm_discuss_be.threadAttachments;

// import java.math.BigInteger;
// import java.security.Timestamp;
// import java.sql.Time;
// import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
// import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

import com.example.ucm_discuss_be.threads.ThreadModel;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "thread_attachments")
public class ThreadAttachmentModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // private Long thread_id; //Foreign key to threads table
    private String file_url;
    private String file_type;

    @OneToOne
    @JoinColumn(name = "thread_id")
    private ThreadModel thread;

    @CreationTimestamp
    private LocalDateTime created_at;
}
