package com.example.ucm_discuss_be.replies;
// import java.math.BigInteger;
// import java.security.Timestamp;
// import java.sql.Time;
// import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.example.ucm_discuss_be.comments.CommentModel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "replies")

public class ReplyModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // private Long source_comment_id; //Foreign key to comments table
    // private Long parent_comment_id; //Foreign key to comments table

    // Relation to the comments table
        @OneToOne
        @JoinColumn(name = "source_comment_id")
        private CommentModel comment; // One reply is associated with one comment
    
        @OneToOne
        @JoinColumn(name = "parent_comment_id")
        private CommentModel parent_comment; // One reply can be a reply to one parent comment
}
