package com.pknu.miniworld.Miniroom.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "miniroom_items")
public class MiniroomItems {

    @Id
    private String id;

    private Long miniroomId;
    private String itemId;
    private Position position;
    private Size size;
    private boolean flipped;
    private String itemSrc;
}
