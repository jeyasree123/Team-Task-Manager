package com.teamtaskmanager.teamtaskmanager.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class AddMemberDTO {
    private UUID userId;
    private String userName;
}
