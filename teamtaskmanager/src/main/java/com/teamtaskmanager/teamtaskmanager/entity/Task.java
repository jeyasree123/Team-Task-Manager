package com.teamtaskmanager.teamtaskmanager.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "tasks")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    private UUID id;
    private String title;
    private String description;
    private String status;
    @Column(name = "team_id")
    private UUID teamId;
    private UUID assignedTo;
}