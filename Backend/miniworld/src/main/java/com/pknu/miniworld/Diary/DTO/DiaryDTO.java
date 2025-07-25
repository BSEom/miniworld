package com.pknu.miniworld.Diary.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

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
    
    @JsonFormat(pattern = "yyyy-MM-dd") // 날짜만 프론트에 보내기
    private LocalDate selectDate;
}