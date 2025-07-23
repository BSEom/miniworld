package com.pknu.miniworld.User.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pknu.miniworld.User.Entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    boolean existsByUsername(String username);
    boolean existsByNickname(String nickname);
    boolean existsByEmail(String email);
}