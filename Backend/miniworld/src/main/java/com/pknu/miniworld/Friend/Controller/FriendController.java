package com.pknu.miniworld.Friend.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pknu.miniworld.Friend.DTO.FriendSearchDTO;
import com.pknu.miniworld.Friend.Service.FriendService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    @GetMapping("/search/{nickname}")
    public List<FriendSearchDTO> getMethodName(@PathVariable(value = "nickname") String nickname) {

        return friendService.getFriendList(nickname);
    }

}
