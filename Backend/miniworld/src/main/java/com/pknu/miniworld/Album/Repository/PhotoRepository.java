package com.pknu.miniworld.Album.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pknu.miniworld.Album.Entity.Photo;

public interface PhotoRepository extends MongoRepository<Photo, String> {
    List<Photo> findByUserId(Long userId);
}
