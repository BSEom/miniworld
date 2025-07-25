package com.pknu.miniworld.Diary.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiaryDTO {
    private Long id;
    private Long userId;
    private String title;
    private String content;
    private String mood;
    private String weather;
    private String isPublic;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}