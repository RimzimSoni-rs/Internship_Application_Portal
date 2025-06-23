package com.practice.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    private String phone;
    private String position;
    
    @Column(name = "resume_url")
    private String resumeUrl;

    private String status; // Pending, Accepted, Rejected

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}