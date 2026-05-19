package com.example.ucm_discuss_be.threadAttachments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadAttachmentRepository extends JpaRepository<ThreadAttachmentModel, Long> {
}