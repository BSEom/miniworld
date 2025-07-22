package com.pknu.miniworld.User.DTO;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserDTO {
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String nickname;

    @Email
    @NotBlank
    private String email;

    private LocalDate birthDate;

    private String isPublic = "Y";  // Optional
}
