package com.sahandevaka.rootcode.service;

import com.sahandevaka.rootcode.dto.CommentDTO;
import com.sahandevaka.rootcode.dto.GetCommentDTO;
import com.sahandevaka.rootcode.entity.Comment;
import com.sahandevaka.rootcode.entity.Post;
import com.sahandevaka.rootcode.repo.CommentRepository;
import com.sahandevaka.rootcode.repo.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    public CommentDTO createComment(CommentDTO commentDTO) {
        Post post = postRepository.findById(commentDTO.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = new Comment();
        comment.setContent(commentDTO.getContent());
        comment.setPost(post);
        comment = commentRepository.save(comment);

//        commentDTO.setId(comment.getId());
        return commentDTO;
    }

    public List<GetCommentDTO> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId).stream().map(comment -> {
            GetCommentDTO dto = new GetCommentDTO();
            dto.setContent(comment.getContent());
            return dto;
        }).collect(Collectors.toList());
    }
}