package com.pknu.miniworld.Friend.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.pknu.miniworld.Friend.DTO.FriendSearchDTO;
import com.pknu.miniworld.Friend.Repository.FriendRepository;
import com.pknu.miniworld.User.Entity.UserEntity;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;

    public List<FriendSearchDTO> getFriendList(String nickname) {

        List<UserEntity> lists = friendRepository.findByNickname(nickname);
        List<FriendSearchDTO> friendDTOs = lists.stream()
                .map(list -> new FriendSearchDTO(list.getUsername(), list.getNickname(), list.getStatus()))
                .collect(Collectors.toList());

        return friendDTOs;
    }
}
