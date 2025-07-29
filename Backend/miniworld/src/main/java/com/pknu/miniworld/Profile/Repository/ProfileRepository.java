package com.pknu.miniworld.Profile.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pknu.miniworld.User.Entity.UserEntity;
import com.pknu.miniworld.Profile.Entity.ProfileEntity;

public interface ProfileRepository extends JpaRepository<ProfileEntity, Long> {
    Optional<ProfileEntity> findByUser(UserEntity user);
}
