package com.pknu.miniworld.Miniroom.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pknu.miniworld.Miniroom.DTO.ItemDTO;
import com.pknu.miniworld.Miniroom.DTO.MiniroomItemsDTO;
import com.pknu.miniworld.Miniroom.Entity.ItemList;
import com.pknu.miniworld.Miniroom.Entity.MiniroomItems;
import com.pknu.miniworld.Miniroom.Repository.ItemListRepository;
import com.pknu.miniworld.Miniroom.Repository.MiniroomItemsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MiniroomItemService {

    private final ItemListRepository itemListRepository;

    private final MiniroomItemsRepository miniroomItemsRepository;

    public List<ItemDTO> getItems() {

        List<ItemList> items = itemListRepository.findAll();
        List<ItemDTO> itemDTOs = items.stream()
                .map(item -> new ItemDTO(item.getName(), item.getImagePath(), item.isInMiniroom()))
                .collect(Collectors.toList());

        return itemDTOs;
    }

    public List<MiniroomItemsDTO> getMyItems(Long miniroomId) {

        List<MiniroomItems> items = miniroomItemsRepository.findByMiniroomId(miniroomId);
        List<MiniroomItemsDTO> itemsDTOs = items.stream()
                .map(item -> new MiniroomItemsDTO(item.getMiniroomId(), item.getItemId(), item.getPosition(),
                        item.getSize(), item.isFlipped(), item.getItemSrc()))
                .collect(Collectors.toList());

        System.err.println(items);
        return itemsDTOs;
    }

    public void saveMiniroomState(Long miniroomId, List<MiniroomItemsDTO> dtoList) {
        // 1. 기존 DB에 저장된 아이템 전체 조회
        List<MiniroomItems> existingItems = miniroomItemsRepository.findByMiniroomId(miniroomId);
        Map<String, MiniroomItems> existingMap = existingItems.stream()
                .collect(Collectors.toMap(MiniroomItems::getItemId, item -> item));

        // 2. DTO 기준으로 update or insert 수행
        Set<String> incomingItemIds = new HashSet<>();
        for (MiniroomItemsDTO dto : dtoList) {
            incomingItemIds.add(dto.getItemId());
            MiniroomItems item = existingMap.get(dto.getItemId());

            if (item != null) {
                // update
                item.setPosition(dto.getPosition());
                item.setSize(dto.getSize());
                item.setFlipped(dto.isFlipped());
                miniroomItemsRepository.save(item);
            } else {
                // insert
                MiniroomItems newItem = new MiniroomItems();
                newItem.setMiniroomId(miniroomId);
                newItem.setItemId(dto.getItemId());
                newItem.setPosition(dto.getPosition());
                newItem.setSize(dto.getSize());
                newItem.setFlipped(dto.isFlipped());
                newItem.setItemSrc(dto.getItemSrc());
                miniroomItemsRepository.save(newItem);
            }
        }

        // 3. DB에는 있지만, 요청에서 빠진 항목 → 삭제 대상
        for (MiniroomItems oldItem : existingItems) {
            if (!incomingItemIds.contains(oldItem.getItemId())) {
                miniroomItemsRepository.delete(oldItem);
            }
        }
    }

}
