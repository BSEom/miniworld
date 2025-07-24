package com.pknu.miniworld.Diary.Controller;

import com.pknu.miniworld.Diary.DTO.DiaryDTO;
import com.pknu.miniworld.Diary.Service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diaries")
@RequiredArgsConstructor

public class DiaryController {
       private final DiaryService diaryService;

    // 저장
    @PostMapping
    public DiaryDTO save(@RequestBody DiaryDTO dto) {
        return diaryService.saveDiary(dto);
    }

    // 전체 조회
    @GetMapping("/{userId}")
    public List<DiaryDTO> getUserDiaries(@PathVariable Long userId) {
        return diaryService.getUserDiaries(userId);
    }

    // 수정
    @PutMapping("/{id}")
    public DiaryDTO update(@PathVariable Long id, @RequestBody DiaryDTO dto) {
        return diaryService.updateDiary(id, dto);
    }

    // 삭제
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        diaryService.deleteDiary(id);
    }
    
}
