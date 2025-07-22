package com.pknu.miniworld.User.Service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.pknu.miniworld.User.DTO.UserDTO;
import com.pknu.miniworld.User.Entity.UserEntity;
import com.pknu.miniworld.User.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public void register(UserDTO request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 등록된 이메일입니다.");
        }
        if (userRepository.existsByNickname(request.getNickname())) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }

        UserEntity user = new UserEntity();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setNickname(request.getNickname());
        user.setEmail(request.getEmail());
        user.setBirthDate(request.getBirthDate());
        user.setIsPublic(request.getIsPublic());

        userRepository.save(user);
    }

    public boolean isEmailAvailable(String email) {
    return !userRepository.existsByEmail(email);
}

public boolean isNicknameAvailable(String nickname) {
    return !userRepository.existsByNickname(nickname);
}


}
