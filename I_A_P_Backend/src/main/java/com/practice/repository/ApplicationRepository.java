package com.practice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practice.entities.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    boolean existsByEmail(String email);
}
