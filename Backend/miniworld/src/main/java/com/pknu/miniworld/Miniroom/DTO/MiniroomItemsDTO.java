package com.pknu.miniworld.Miniroom.DTO;

import com.pknu.miniworld.Miniroom.Entity.Position;
import com.pknu.miniworld.Miniroom.Entity.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MiniroomItemsDTO {

    private Long miniroomId;
    private String itemId;
    private Position position;
    private Size size;
    private boolean flipped;
    private String itemSrc;

}
