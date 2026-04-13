package com.teamtaskmanager.teamtaskmanager.controller;

import com.teamtaskmanager.teamtaskmanager.dto.CreateTaskDTO;
import com.teamtaskmanager.teamtaskmanager.dto.UpdateTaskDTO;
import com.teamtaskmanager.teamtaskmanager.entity.Task;
import com.teamtaskmanager.teamtaskmanager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public Task createTask(@RequestBody CreateTaskDTO dto,
                           @RequestHeader UUID userId) {

        return taskService.createTask(dto, userId);
    }

    @GetMapping("/{teamId}")
    public List<Task> getTasks(@PathVariable UUID teamId,
                               @RequestHeader UUID userId) {

        return taskService.getTasks(teamId, userId);
    }

    @PutMapping("/{taskId}")
    public Task updateTask(@PathVariable UUID taskId,
                           @RequestBody UpdateTaskDTO dto,
                           @RequestHeader UUID userId) {

        return taskService.updateTask(taskId, dto, userId);
    }
}