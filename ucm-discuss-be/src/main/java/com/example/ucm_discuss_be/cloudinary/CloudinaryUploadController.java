package com.example.ucm_discuss_be.cloudinary;

import com.example.ucm_discuss_be.responses.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import lombok.RequiredArgsConstructor;
import java.io.IOException;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class CloudinaryUploadController {

    private final CloudinaryUploadService uploadService;

    @PostMapping
    public ResponseEntity<ApiResponse<String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Check if file is empty
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("File is empty"));
            }

            // Upload to Cloudinary
            String imageUrl = uploadService.uploadImage(file);

            // Return the URL to the frontend
            return ResponseEntity.ok(ApiResponse.success(imageUrl, "Image uploaded successfully"));
            
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(ApiResponse.error("Failed to upload image: " + e.getMessage()));
        }
    }
}