package com.teamtaskmanager.teamtaskmanager.controller;

import com.teamtaskmanager.teamtaskmanager.dto.AddMemberDTO;
import com.teamtaskmanager.teamtaskmanager.dto.CreateTeamDTO;
import com.teamtaskmanager.teamtaskmanager.entity.Team;
import com.teamtaskmanager.teamtaskmanager.entity.TeamMember;
import com.teamtaskmanager.teamtaskmanager.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TeamController {

    private final TeamService teamService;

    // ✅ CREATE TEAM
    @PostMapping
    public Team createTeam(@RequestBody CreateTeamDTO dto,
                           @AuthenticationPrincipal Jwt jwt) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return teamService.createTeam(dto, userId);

    }

    // ✅ GET TEAMS
    @GetMapping
    public List<Team> getTeams(@AuthenticationPrincipal Jwt jwt) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return teamService.getTeams(userId);
    }

    // ✅ GET MEMBERS (NEW - FIX FRONTEND ERROR)
    @GetMapping("/{teamId}/members")
    public List<TeamMember> getMembers(@PathVariable UUID teamId,
                                       @AuthenticationPrincipal Jwt jwt) {

        UUID userId = UUID.fromString(jwt.getSubject());
        return teamService.getMembers(teamId, userId);
    }

    // ✅ ADD MEMBER
    @PostMapping("/{teamId}/members")
    public void addMember(@PathVariable UUID teamId,
                          @RequestBody AddMemberDTO dto,
                          @AuthenticationPrincipal Jwt jwt) {

        UUID adminId = UUID.fromString(jwt.getSubject());
        teamService.addMember(teamId, dto.getUserId(),dto.getUserName(), adminId);
    }

    // ✅ REMOVE MEMBER
    @DeleteMapping("/{teamId}/members/{memberId}")
    public void removeMember(@PathVariable UUID teamId,
                             @PathVariable UUID memberId,
                             @AuthenticationPrincipal Jwt jwt) {

        UUID adminId = UUID.fromString(jwt.getSubject());
        teamService.removeMember(teamId, memberId, adminId);
    }
    @DeleteMapping("/{teamId}")
    public void deleteTeam(@PathVariable UUID teamId,
                           @RequestHeader UUID userId){
        teamService.deleteTeam(teamId,userId);
    }
}