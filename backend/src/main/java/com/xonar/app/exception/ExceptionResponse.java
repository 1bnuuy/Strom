package com.xonar.app.exception;

import lombok.Getter;

@Getter
public abstract class ExceptionResponse extends RuntimeException {
    public ExceptionResponse(String message) { super(message); }
}