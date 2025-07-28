package com.pknu.miniworld.User.Service;

import com.pknu.miniworld.Miniroom.Entity.MiniroomEntity;
import com.pknu.miniworld.Miniroom.Repository.MiniroomRepository;
import com.pknu.miniworld.User.DTO.UserDTO;
import com.pknu.miniworld.User.Entity.UserEntity;
import com.pknu.miniworld.User.Repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final MiniroomRepository miniroomRepository;

    public void register(UserDTO request) {
        validateDuplicate(request);

        UserEntity user = new UserEntity();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setNickname(request.getNickname());
        user.setEmail(request.getEmail());
        user.setBirthDate(request.getBirthDate());
        user.setIsPublic(request.getIsPublic());

        UserEntity savedUser = userRepository.save(user);

        // 미니룸 생성
        MiniroomEntity miniroom = new MiniroomEntity();
        miniroom.setUser(savedUser);
        miniroom.setBackgroundImageUrl("/images/default_background.jpg");
        miniroomRepository.save(miniroom);
    }

    private void validateDuplicate(UserDTO request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 등록된 이메일입니다.");
        }
        if (userRepository.existsByNickname(request.getNickname())) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }
    }

    public boolean isEmailAvailable(String email) {
        return !userRepository.existsByEmail(email);
    }

    public boolean isNicknameAvailable(String nickname) {
        return !userRepository.existsByNickname(nickname);
    }

    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsername(username);
    }

    public UserEntity authenticate(String email, String rawPassword) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(rawPassword, user.getPassword()))
                .orElse(null);
    }

    // 추가: 사용자 ID로 사용자 찾기
    public UserEntity findByUserId(Long userId) {
        return userRepository.findByUserId(userId).orElse(null);
    }

    // 비밀번호 재설정
    public void resetPassword(String username, String newPassword) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자 없음"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    // username으로 찾기
    public UserEntity findByEmail(String email) {
    return userRepository.findByEmail(email).orElse(null);
}
    public Long getUserIdByUsername(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다: " + username));
        return user.getUserId(); // userId만 반환
    }
}