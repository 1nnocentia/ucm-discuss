package com.example.ucm_discuss_be.replies;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReplyRepository extends JpaRepository<ReplyModel, Long> {

    @Query("SELECT r FROM ReplyModel r JOIN FETCH r.reply_comment JOIN FETCH r.parent_comment WHERE r.parent_comment.id = :parentCommentId")
    List<ReplyModel> findByParentCommentId(@Param("parentCommentId") Long parentCommentId);

    @Query("SELECT r FROM ReplyModel r JOIN FETCH r.reply_comment JOIN FETCH r.parent_comment WHERE r.reply_comment.id = :replyCommentId")
    Optional<ReplyModel> findByReplyCommentId(@Param("replyCommentId") Long replyCommentId);
}