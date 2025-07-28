package com.pknu.miniworld.Miniroom.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "item_list")
public class ItemList {

    @Id
    private String id;

    private String name;
    private String imagePath;
    private boolean inMiniroom;

}
