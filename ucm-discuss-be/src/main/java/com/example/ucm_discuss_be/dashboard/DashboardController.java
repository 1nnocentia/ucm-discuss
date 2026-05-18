package com.example.ucm_discuss_be.dashboard;

import com.example.ucm_discuss_be.responses.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@PreAuthorize("hasRole('DOSEN')")
public class DashboardController {

    @GetMapping("/active-threads")
    public ResponseEntity<ApiResponse<List<?>>> getActiveThreads() {
        return ResponseEntity.ok(ApiResponse.success(List.of()));
    }

    @GetMapping("/response-rate")
    public ResponseEntity<ApiResponse<Double>> getResponseRate() {
        return ResponseEntity.ok(ApiResponse.success(0.0));
    }

    @GetMapping("/unresponded-threads")
    public ResponseEntity<ApiResponse<List<?>>> getUnrespondedThreads() {
        return ResponseEntity.ok(ApiResponse.success(List.of()));
    }

    @GetMapping("/topic-percentages")
    public ResponseEntity<ApiResponse<Map<String, Double>>> getTopicPercentages() {
        return ResponseEntity.ok(ApiResponse.success(Map.of()));
    }
}