package com.example.ucm_discuss_be.aiInteraction;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {
    private final AiService aiService;

    @PostMapping("/ask")
    public ResponseEntity<Map<String, String>> askGeneric(
            @RequestBody AiQuestionRequest request) {
        String answer = aiService.generateAnswer(request.getQuestion());
        return ResponseEntity.ok(Map.of("status", "success", "answer", answer));
    }

    @PostMapping("/threads/{threadId}/ask")
    public ResponseEntity<Map<String, String>> askInThread(
            @PathVariable String threadId,
            @RequestBody AiQuestionRequest request) {
        String answer = aiService.getAnswerAndSave(Long.parseLong(threadId), request.getQuestion());
        return ResponseEntity.ok(Map.of("status", "success", "answer", answer));
    }
}