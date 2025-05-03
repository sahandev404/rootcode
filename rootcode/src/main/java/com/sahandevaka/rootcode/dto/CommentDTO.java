package com.sahandevaka.rootcode.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommentDTO {

//    private Long id;

    @NotBlank(message = "Content is mandatory")
    private String content;

//    private Long postId;
}