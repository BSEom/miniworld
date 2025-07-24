package com.pknu.miniworld.Miniroom.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.pknu.miniworld.Miniroom.DTO.ItemDTO;
import com.pknu.miniworld.Miniroom.Entity.ItemList;
import com.pknu.miniworld.Miniroom.Repository.ItemListRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MiniroomItemService {

    private final ItemListRepository itemListRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    // private final MiniroomItemService miniroomItemService;

    public List<ItemDTO> getItems() {

        List<ItemList> items = itemListRepository.findAll();
        List<ItemDTO> itemDTOs = items.stream()
                .map(item -> new ItemDTO(item.getName(), item.getImagePath(), item.isInMiniroom()))
                .collect(Collectors.toList());

        return itemDTOs;
    }
}
