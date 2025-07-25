package com.pknu.miniworld.Diary.Service;

import com.pknu.miniworld.Diary.DTO.DiaryDTO;
import com.pknu.miniworld.Diary.Entity.DiaryEntity;
import com.pknu.miniworld.Diary.Repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;

    // 저장
    public DiaryDTO saveDiary(DiaryDTO dto) {
        DiaryEntity diary = DiaryEntity.builder()
                .userId(dto.getUserId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .mood(dto.getMood())
                .weather(dto.getWeather())
                .isPublic(dto.getIsPublic())
                .createdAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        DiaryEntity saved = diaryRepository.save(diary);
        return convertToDto(saved);
    }

    // 전체 조회
    public List<DiaryDTO> getUserDiaries(Long userId) {
        return diaryRepository.findByUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 수정
    public DiaryDTO updateDiary(Long id, DiaryDTO dto) {
        DiaryEntity diary = diaryRepository.findById(id).orElseThrow();
        diary.setTitle(dto.getTitle());
        diary.setContent(dto.getContent());
        diary.setMood(dto.getMood());
        diary.setWeather(dto.getWeather());
        diary.setIsPublic(dto.getIsPublic());
        diary.setUpdatedAt(LocalDateTime.now());
        DiaryEntity updated = diaryRepository.save(diary);
        return convertToDto(updated);
    }

    // 삭제
    public void deleteDiary(Long id) {
        diaryRepository.deleteById(id);
    }

    // ⭐ 누락된 메서드 추가
    private LocalDateTime parseUserDate(String dateStr) {
        try {
            return LocalDate.parse(dateStr).atStartOfDay();
        } catch (Exception e) {
            return LocalDateTime.now();
        }
    }

    // 변환 메서드
    private DiaryDTO convertToDto(DiaryEntity diary) {
        return DiaryDTO.builder()
                .id(diary.getId())
                .userId(diary.getUserId())
                .title(diary.getTitle())
                .content(diary.getContent())
                .mood(diary.getMood())
                .weather(diary.getWeather())
                .isPublic(diary.getIsPublic())
                .createdAt(diary.getCreatedAt())
                .updatedAt(diary.getUpdatedAt())
                .build();
    }
}