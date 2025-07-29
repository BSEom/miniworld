package com.pknu.miniworld.Profile.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileUpdateRequestDto {
    private String topBannerText;
    private String leftBannerText;
    private String profileImageUrl;
    private Long currentMusicId;
    private String musicPlayType;
    private String musicRepeatType;
    private String mood;
}

