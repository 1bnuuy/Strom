package com.xonar.app.dto;

public class Response {
    public record AuthResponse(String accessToken, String refreshToken, String message) {}
}
