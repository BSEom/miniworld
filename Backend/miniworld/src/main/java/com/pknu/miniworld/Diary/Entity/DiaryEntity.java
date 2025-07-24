package com.pknu.miniworld.Diary.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "DIARIES")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiaryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DIARY_ID")
    private Long id;

    @Column(name = "USER_ID", nullable = false)
    private Long userId;  // 로그인 연동 시 사용자 정보로 바인딩

    @Column(name = "TITLE", nullable = false)
    private String title;

    @Column(name = "CONTENT", columnDefinition = "CLOB")
    private String content;

    @Column(name = "MOOD")
    private String mood;

    @Column(name = "WEATHER")
    private String weather;

    @Column(name = "IS_PUBLIC")
    private String isPublic; // 'Y' / 'N'

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;
}
