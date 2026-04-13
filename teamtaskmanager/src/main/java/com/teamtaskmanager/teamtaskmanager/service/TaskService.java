package com.teamtaskmanager.teamtaskmanager.service;

import com.teamtaskmanager.teamtaskmanager.dto.CreateTaskDTO;
import com.teamtaskmanager.teamtaskmanager.dto.UpdateTaskDTO;
import com.teamtaskmanager.teamtaskmanager.entity.Task;
import com.teamtaskmanager.teamtaskmanager.repository.TaskRepository;
import com.teamtaskmanager.teamtaskmanager.repository.TeamMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepo;
    private final TeamMemberRepository memberRepo;

    public Task createTask(CreateTaskDTO dto, UUID userId) {

        if (!memberRepo.existsByUserIdAndTeamId(userId, dto.getTeamId())) {
            throw new RuntimeException("Access denied");
        }

        Task task = Task.builder()
                .id(UUID.randomUUID())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .teamId(dto.getTeamId())
                .assignedTo(dto.getAssignedTo())
                .status("PENDING")
                .build();

        return taskRepo.save(task);
    }

    public List<Task> getTasks(UUID teamId, UUID userId) {

        if (!memberRepo.existsByUserIdAndTeamId(userId, teamId)) {
            throw new RuntimeException("Access denied");
        }

        return taskRepo.findByTeamId(teamId);
    }

    public Task updateTask(UUID taskId, UpdateTaskDTO dto, UUID userId) {

        Task task = taskRepo.findById(taskId).orElseThrow();

        if (!memberRepo.existsByUserIdAndTeamId(userId, task.getTeamId())) {
            throw new RuntimeException("Access denied");
        }

        task.setStatus(dto.getStatus());

        return taskRepo.save(task);
    }
}