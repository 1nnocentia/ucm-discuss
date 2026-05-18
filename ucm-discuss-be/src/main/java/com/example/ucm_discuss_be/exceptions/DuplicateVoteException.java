package com.example.ucm_discuss_be.exceptions;

import org.springframework.http.HttpStatus;

public class DuplicateVoteException extends BusinessException {
    public DuplicateVoteException() {
        super("You have already voted on this item", HttpStatus.CONFLICT);
    }
}