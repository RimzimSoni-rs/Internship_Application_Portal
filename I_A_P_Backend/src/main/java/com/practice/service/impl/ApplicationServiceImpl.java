package com.practice.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.practice.dto.ApplicationRequest;
import com.practice.dto.ApplicationResponse;
import com.practice.entities.Application;
import com.practice.repository.ApplicationRepository;
import com.practice.service.ApplicationService;
import com.practice.exception.ResourceNotFoundException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;

    @Override
    public ApplicationResponse submitApplication(ApplicationRequest request) {
        if (applicationRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Application already submitted with this email");
        }

        Application app = Application.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .position(request.getPosition())
                .resumeUrl(request.getResumeUrl())
                .status("Pending")
                .createdAt(LocalDateTime.now())
                .build();

        app = applicationRepository.save(app);
        return mapToResponse(app);
    }

    @Override
    public List<ApplicationResponse> getAllApplications() {
        return applicationRepository.findAll().stream()
                .map(this::mapToResponse).toList();
    }

    @Override
    public ApplicationResponse getApplicationById(Long id) {
        Application app = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        return mapToResponse(app);
    }

    @Override
    public ApplicationResponse updateApplicationStatus(Long id, String status) {
        Application app = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        app.setStatus(status);
        return mapToResponse(applicationRepository.save(app));
    }

    private ApplicationResponse mapToResponse(Application app) {
        return ApplicationResponse.builder()
                .id(app.getId())
                .name(app.getName())
                .email(app.getEmail())
                .phone(app.getPhone())
                .position(app.getPosition())
                .resumeUrl(app.getResumeUrl())
                .status(app.getStatus())
                .createdAt(app.getCreatedAt() != null ? app.getCreatedAt().toString() : "N/A"
)
                .build();
    }


}