package com.teamtaskmanager.teamtaskmanager.dto;

import com.teamtaskmanager.teamtaskmanager.entity.TaskStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateTaskDTO {
    private String status;
}