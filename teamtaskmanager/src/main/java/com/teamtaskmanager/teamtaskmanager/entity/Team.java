package com.teamtaskmanager.teamtaskmanager.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "teams")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Team {
    @Id
    private UUID id;
    private String name;
    @Column(name = "owner_id")
    private UUID ownerId;
    private String userName;
    private Boolean isPaid;
    private String paymentType;
}