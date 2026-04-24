package com.xonar.app.exception.status;

import com.xonar.app.exception.ExceptionResponse;

public class ConflictException extends ExceptionResponse {
    public ConflictException(String message) { super(message); }
}