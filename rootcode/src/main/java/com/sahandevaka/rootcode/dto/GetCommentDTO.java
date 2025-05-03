package com.sahandevaka.rootcode.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetCommentDTO {

    private Long id;

    @NotBlank(message = "Content is mandatory")
    private String content;

    private Date createdAt;

    private Long postId;
}