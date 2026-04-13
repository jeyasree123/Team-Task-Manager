package com.teamtaskmanager.teamtaskmanager.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateTeamDTO {
    private String name;
    private Boolean isPaid;
    private String paymentType;
    private String userName;
}