package com.pknu.miniworld.Diary.Service;

import com.pknu.miniworld.Diary.DTO.DiaryDTO;
import com.pknu.miniworld.Diary.Entity.DiaryEntity;
import com.pknu.miniworld.Diary.Repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
                .selectDate(dto.getSelectDate() != null ? dto.getSelectDate() : LocalDateTime.now())
                .build();

        DiaryEntity saved = diaryRepository.save(diary);
        return convertToDto(saved);
    }

    // 전체 조회
    public List<DiaryDTO> getUserDiaries(Long userId) {
        System.out.println("📌 사용자 ID: " + userId);
        List<DiaryEntity> diaries = diaryRepository.findByUserId(userId);
        System.out.println("📌 일기 개수: " + diaries.size());
        return diaries.stream()
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
        diary.setSelectDate(dto.getSelectDate());
        DiaryEntity updated = diaryRepository.save(diary);
        return convertToDto(updated);
    }

    // 삭제
    public void deleteDiary(Long id) {
        diaryRepository.deleteById(id);
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
                .selectDate(diary.getSelectDate())
                .build();
    }
}