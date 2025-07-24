package com.pknu.miniworld.Diary.DTO;

import lombok.*;

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
    private boolean isPublic;
    private String createdAt;
    private String updatedAt;
}