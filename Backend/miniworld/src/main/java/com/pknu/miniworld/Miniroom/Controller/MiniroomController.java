package com.pknu.miniworld.Miniroom.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pknu.miniworld.Miniroom.Entity.MiniroomEntity;
import com.pknu.miniworld.Miniroom.Service.MiniroomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/minirooms")
@RequiredArgsConstructor
public class MiniroomController {
    private final MiniroomService miniroomService;

    @GetMapping("/{userId}")
    public ResponseEntity<MiniroomEntity> getMiniroomByUserId(@PathVariable Long userId) {
        MiniroomEntity miniroom = miniroomService.getMiniroomByUserId(userId);
        return ResponseEntity.ok(miniroom);
    }
}
