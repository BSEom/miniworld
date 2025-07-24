package com.pknu.miniworld.Miniroom.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ItemDTO {

    private String name;
    private String imagePath;
    private boolean inMiniroom;

}
