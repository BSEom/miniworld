package com.pknu.miniworld.Album.Service;

import com.pknu.miniworld.Album.Entity.Photo;
import com.pknu.miniworld.Album.Repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photoRepository;

    // 파일 저장 및 파일명 반환
    public String uploadFile(MultipartFile file, String uploadDir) throws Exception {
        String filename = UUID.randomUUID() + "_" + Objects.requireNonNull(file.getOriginalFilename());
        Path savePath = Paths.get(uploadDir, filename);
        Files.createDirectories(savePath.getParent());
        file.transferTo(savePath);
        return filename;
    }

    // 사진 정보 저장
    public Photo savePhoto(Map<String, Object> req) {
        Photo p = new Photo();
        p.setFilename((String) req.get("filename"));
        p.setTitle((String) req.get("title"));
        p.setContent((String) req.get("content"));
        p.setCategory((String) req.get("category"));
        p.setUserId(Long.valueOf(req.get("userId").toString()));
        p.setCreatedAt(LocalDateTime.now());
        return photoRepository.save(p);
    }

    // 유저별 사진 목록
    public List<Photo> getPhotos(Long userId) {
        List<Photo> list = photoRepository.findByUserId(userId);
        list.sort(Comparator.comparing(Photo::getCreatedAt).reversed());
        return list;
    }
}
