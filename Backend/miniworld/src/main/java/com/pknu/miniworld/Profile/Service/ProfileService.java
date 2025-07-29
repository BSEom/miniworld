package com.pknu.miniworld.Profile.Service;

import org.springframework.stereotype.Service;

import com.pknu.miniworld.Profile.DTO.ProfileResponseDto;
import com.pknu.miniworld.Profile.DTO.ProfileUpdateRequestDto;
import com.pknu.miniworld.Profile.Repository.ProfileRepository;
import com.pknu.miniworld.User.Repository.UserRepository;
import com.pknu.miniworld.User.Entity.UserEntity;
import com.pknu.miniworld.Profile.Entity.ProfileEntity;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileResponseDto getProfile(Long userId) {
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        ProfileEntity profile = profileRepository.findByUser(user)
            .orElseThrow(() -> new RuntimeException("프로필이 존재하지 않습니다."));

        return ProfileResponseDto.builder()
            .profileId(profile.getProfileId())
            .topBannerText(profile.getTopBannerText())
            .leftBannerText(profile.getLeftBannerText())
            .profileImageUrl(profile.getProfileImageUrl())
            .currentMusicId(profile.getCurrentMusicId())
            .musicPlayType(profile.getMusicPlayType())
            .musicRepeatType(profile.getMusicRepeatType())
            .mood(profile.getMood())
            .build();
    }

    public void updateProfile(Long userId, ProfileUpdateRequestDto dto) {
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        ProfileEntity profile = profileRepository.findByUser(user)
            .orElseThrow(() -> new RuntimeException("프로필이 존재하지 않습니다."));

        profile.setTopBannerText(dto.getTopBannerText());
        profile.setLeftBannerText(dto.getLeftBannerText());
        profile.setProfileImageUrl(dto.getProfileImageUrl());
        profile.setCurrentMusicId(dto.getCurrentMusicId());
        profile.setMusicPlayType(dto.getMusicPlayType());
        profile.setMusicRepeatType(dto.getMusicRepeatType());
        profile.setMood(dto.getMood());

        profileRepository.save(profile);
    }

    // 회원가입 시 기본 프로필 생성
    public void createDefaultProfile(UserEntity user) {
        ProfileEntity profile = ProfileEntity.builder()
            .user(user)
            .topBannerText("환영합니다!")
            .leftBannerText("기본 상태메시지")
            .profileImageUrl("default_profile.jpg")
            .musicPlayType("NONE")
            .musicRepeatType("NONE")
            .mood("😊")
            .build();

        profileRepository.save(profile);
    }
}

