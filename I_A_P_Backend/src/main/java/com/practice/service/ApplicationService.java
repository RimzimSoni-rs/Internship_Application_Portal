package com.practice.service;


import java.util.List;

import com.practice.dto.ApplicationRequest;
import com.practice.dto.ApplicationResponse;

public interface ApplicationService {
    ApplicationResponse submitApplication(ApplicationRequest request);
    List<ApplicationResponse> getAllApplications();
    ApplicationResponse getApplicationById(Long id);
    ApplicationResponse updateApplicationStatus(Long id, String status);
}