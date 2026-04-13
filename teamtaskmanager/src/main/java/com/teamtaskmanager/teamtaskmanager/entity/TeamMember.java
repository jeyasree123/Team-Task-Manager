package com.teamtaskmanager.teamtaskmanager.entity;



import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "team_members")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamMember {
    @Id
    private UUID id;
    private UUID userId;
    private String userName;
    private UUID teamId;
    private String role;
}