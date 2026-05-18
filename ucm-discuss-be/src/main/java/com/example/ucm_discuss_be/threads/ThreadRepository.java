package com.example.ucm_discuss_be.threads;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadRepository extends JpaRepository<ThreadModel, Long> {
    // You can add custom query methods here later if needed
}