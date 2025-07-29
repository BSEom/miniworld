package com.pknu.miniworld.Profile.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileResponseDto {
    private Long profileId;
    private String topBannerText;
    private String leftBannerText;
    private String profileImageUrl;
    private Long currentMusicId;
    private String musicPlayType;
    private String musicRepeatType;
    private String mood;
}