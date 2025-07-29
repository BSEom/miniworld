package com.pknu.miniworld.Album.Entity;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "photos")
@Data
public class Photo {

    @Id
    private String id;
    private Long userId;
    private String filename;
    private String title;
    private String content;
    private String category;
    private LocalDateTime createdAt;
}
