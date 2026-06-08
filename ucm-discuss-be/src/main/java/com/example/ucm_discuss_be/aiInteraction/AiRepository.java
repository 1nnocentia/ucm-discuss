package com.example.ucm_discuss_be.aiInteraction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AiRepository extends JpaRepository<AiInteractionModel, Long> {
}