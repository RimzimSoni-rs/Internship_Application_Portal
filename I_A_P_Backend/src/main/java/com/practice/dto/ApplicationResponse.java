package com.practice.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ApplicationResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String position;
    private String resumeUrl;
    private String status;
    private String createdAt;
}