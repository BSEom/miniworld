package com.pknu.miniworld.Profile.Entity;


import java.sql.Timestamp;
import com.pknu.miniworld.User.Entity.UserEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_profiles_gen")
    @SequenceGenerator(name = "seq_profiles_gen", sequenceName = "seq_profiles", allocationSize = 1)
    @Column(name = "profile_id")
    private Long profileId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "top_banner_text")
    private String topBannerText;

    @Column(name = "left_banner_text")
    private String leftBannerText;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name = "current_music_id")
    private Long currentMusicId;

    @Column(name = "music_play_type")
    private String musicPlayType; // 'AUTO', 'MANUAL', 'NONE'

    @Column(name = "music_repeat_type")
    private String musicRepeatType; // 'NONE', 'ONE', 'ALL'

    @Column(name = "mood")
    private String mood;

    @Column(name = "created_at", insertable = false, updatable = false)
    private Timestamp createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private Timestamp updatedAt;
}
