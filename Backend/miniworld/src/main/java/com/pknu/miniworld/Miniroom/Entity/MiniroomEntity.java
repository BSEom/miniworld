package com.pknu.miniworld.Miniroom.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.pknu.miniworld.User.Entity.UserEntity;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "minirooms")
public class MiniroomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "miniroom_seq_gen")
    @SequenceGenerator(name = "miniroom_seq_gen", sequenceName = "SEQ_MINIROOMS", allocationSize = 1)
    private Long miniroomId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    private String backgroundImageUrl;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
