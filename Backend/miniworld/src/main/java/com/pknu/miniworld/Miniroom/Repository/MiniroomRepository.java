package com.pknu.miniworld.Miniroom.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pknu.miniworld.Miniroom.Entity.MiniroomEntity;

public interface MiniroomRepository extends JpaRepository<MiniroomEntity, Long> {
    Optional<MiniroomEntity> findByUser_UserId(Long userId);
}
