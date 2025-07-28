package com.pknu.miniworld.Diary.Repository;

import com.pknu.miniworld.Diary.Entity.DiaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DiaryRepository extends JpaRepository<DiaryEntity, Long> {
    List<DiaryEntity> findByUserId(Long userId);
}