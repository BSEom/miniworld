package com.pknu.miniworld.User.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pknu.miniworld.User.Entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    boolean existsByUsername(String username);
    boolean existsByNickname(String nickname);
    boolean existsByEmail(String email);

    // 추가: 이메일로 사용자 찾기
    Optional<UserEntity> findByEmail(String email);
    
    // 추가: 사용자 ID로 사용자 찾기 (JWT에서 사용)
    Optional<UserEntity> findByUserId(Long userId);
}