package com.pknu.miniworld.Friend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pknu.miniworld.User.Entity.UserEntity;

public interface FriendRepository extends JpaRepository<UserEntity, Long> {

    List<UserEntity> findByNickname(String nickname);
}
