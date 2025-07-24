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

    private String miniroomId;
    private String itemId;
    private Object postion;
    private Object size;
    private boolean flipped;
}
