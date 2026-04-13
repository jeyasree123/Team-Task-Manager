package com.teamtaskmanager.teamtaskmanager.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class CreateTaskDTO {
    private String title;
    private String description;
    private UUID teamId;
    private UUID assignedTo;
}