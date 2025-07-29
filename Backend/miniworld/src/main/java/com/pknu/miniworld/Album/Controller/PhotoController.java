package com.pknu.miniworld.Album.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.pknu.miniworld.Album.Entity.Photo;
import com.pknu.miniworld.Album.Service.PhotoService;

import java.nio.file.*;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/album")
public class PhotoController {

    private final PhotoService photoService;

    @Value("${photo.upload-dir:./uploads}")
    private String uploadDir;

    // 파일 업로드
    @PostMapping("/upload")
    public Map<String, String> upload(@RequestParam("file") MultipartFile file) throws Exception {
        String filename = photoService.uploadFile(file, uploadDir);
        return Collections.singletonMap("filename", filename);
    }

    // 사진 정보 저장
    @PostMapping("/photos")
    public Photo savePhoto(@RequestBody Map<String, Object> req) {
        return photoService.savePhoto(req);
    }

    // 유저별 사진 목록
    @GetMapping("/photos/{userId}")
    public List<Photo> getPhotos(@PathVariable Long userId) {
        return photoService.getPhotos(userId);
    }

    // 업로드된 이미지 반환 (이건 Controller에 남겨둬도 됩니다!)
    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws Exception {
        Path file = Paths.get(uploadDir).resolve(filename);
        Resource resource = new UrlResource(file.toUri());
        String contentType = Files.probeContentType(file);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType != null ? contentType : "application/octet-stream"))
                .body(resource);
    }
}
