package com.teamtaskmanager.teamtaskmanager.repository;

import com.teamtaskmanager.teamtaskmanager.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TeamMemberRepository extends JpaRepository<TeamMember, UUID> {

    boolean existsByUserIdAndTeamId(UUID userId, UUID teamId);

    Optional<TeamMember> findByUserIdAndTeamId(UUID userId, UUID teamId);

    List<TeamMember> findByTeamId(UUID teamId); // ✅ NEW (IMPORTANT)
}