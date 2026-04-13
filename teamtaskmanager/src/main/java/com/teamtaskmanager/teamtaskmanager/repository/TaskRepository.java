package com.teamtaskmanager.teamtaskmanager.repository;

import com.teamtaskmanager.teamtaskmanager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByTeamId(UUID teamId);
}
