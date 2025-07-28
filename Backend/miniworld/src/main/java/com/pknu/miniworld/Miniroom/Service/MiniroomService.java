package com.pknu.miniworld.Miniroom.Service;

import com.pknu.miniworld.Miniroom.Entity.MiniroomEntity;
import com.pknu.miniworld.Miniroom.Repository.MiniroomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MiniroomService {

    private final MiniroomRepository miniroomRepository;

    public MiniroomEntity getMiniroomByUserId(Long userId) {
        return miniroomRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Miniroom not found for userId: " + userId));
    }

    public MiniroomEntity getMiniroomById(Long id) {
        return miniroomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Miniroom not found with id: " + id));
    }
}
