package com.xonar.app.exception.status;

import com.xonar.app.exception.ExceptionResponse;

public class NotFoundException extends ExceptionResponse {
    public NotFoundException(String message) { super(message); }
}