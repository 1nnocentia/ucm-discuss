package com.example.ucm_discuss_be.exceptions;

import org.springframework.http.HttpStatus;

public class ReplyDepthExceededException extends BusinessException {
    public ReplyDepthExceededException(int maxDepth) {
        super("Replies cannot exceed nesting depth of " + maxDepth, HttpStatus.BAD_REQUEST);
    }
}