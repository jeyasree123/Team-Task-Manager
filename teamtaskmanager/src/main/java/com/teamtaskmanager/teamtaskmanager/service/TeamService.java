package com.teamtaskmanager.teamtaskmanager.service;

import com.teamtaskmanager.teamtaskmanager.dto.CreateTeamDTO;
import com.teamtaskmanager.teamtaskmanager.entity.Team;
import com.teamtaskmanager.teamtaskmanager.entity.TeamMember;
import com.teamtaskmanager.teamtaskmanager.repository.TeamMemberRepository;
import com.teamtaskmanager.teamtaskmanager.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepo;
    private final TeamMemberRepository memberRepo;

    public Team createTeam(CreateTeamDTO dto, UUID userId) {

        Team team = Team.builder()
                .id(UUID.randomUUID())
                .name(dto.getName())
                .userName(dto.getUserName())
                .ownerId(userId)
                .isPaid(dto.getIsPaid())
                .paymentType(dto.getPaymentType())
                .build();

        teamRepo.save(team);

        memberRepo.save(
                TeamMember.builder()
                        .id(UUID.randomUUID())
                        .teamId(team.getId())
                        .userId(userId)
                        .role("ADMIN")
                        .build()
        );

        return team;
    }

    // ✅ GET TEAMS
    public List<Team> getTeams(UUID userId) {
        return teamRepo.findByOwnerId(userId);
    }

    // ✅ GET MEMBERS (NEW)
    public List<TeamMember> getMembers(UUID teamId, UUID userId) {

        // check user is part of team
        memberRepo.findByUserIdAndTeamId(userId, teamId)
                .orElseThrow(() -> new RuntimeException("Not a team member"));

        return memberRepo.findByTeamId(teamId);
    }

    // ✅ ADD MEMBER
    public void addMember(UUID teamId, UUID userId, String userName,UUID adminId) {

        TeamMember admin = memberRepo
                .findByUserIdAndTeamId(adminId, teamId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!admin.getRole().equals("ADMIN")) {
            throw new RuntimeException("Only admin allowed");
        }

        // prevent duplicate
        if (memberRepo.existsByUserIdAndTeamId(userId, teamId)) {
            throw new RuntimeException("User already in team");
        }

        memberRepo.save(
                TeamMember.builder()
                        .id(UUID.randomUUID())
                        .teamId(teamId)
                        .userId(userId)
                        .userName(userName)
                        .role("MEMBER")
                        .build()
        );
    }

    // ✅ REMOVE MEMBER
    public void removeMember(UUID teamId, UUID userId, UUID adminId) {

        TeamMember admin = memberRepo
                .findByUserIdAndTeamId(adminId, teamId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!admin.getRole().equals("ADMIN")) {
            throw new RuntimeException("Only admin allowed");
        }

        TeamMember member = memberRepo
                .findByUserIdAndTeamId(userId, teamId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        memberRepo.delete(member);
    }
    public void deleteTeam(UUID teamId, UUID adminId) {
        TeamMember admin = memberRepo
                .findByUserIdAndTeamId(adminId, teamId)
                .orElseThrow();

        if (!admin.getRole().equals("ADMIN")) {
            throw new RuntimeException("Only admin allowed");
        }
        teamRepo.deleteById(teamId);

    }
}