package com.sahandevaka.rootcode.service;

import com.sahandevaka.rootcode.dto.GetCommentDTO;
import com.sahandevaka.rootcode.dto.GetPostDTO;
import com.sahandevaka.rootcode.dto.PostDTO;
import com.sahandevaka.rootcode.entity.Comment;
import com.sahandevaka.rootcode.entity.Post;
import com.sahandevaka.rootcode.repo.CommentRepository;
import com.sahandevaka.rootcode.repo.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;

    public PostDTO createPost(PostDTO postDTO) {
        Post post = new Post();
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post = postRepository.save(post);

        postDTO.setId(post.getId());
        return postDTO;
    }

    public List<GetPostDTO> getAllPosts() {
        return postRepository.findAll().stream().map(post -> {
            GetPostDTO dto = new GetPostDTO();
            dto.setId(post.getId());
            dto.setTitle(post.getTitle());
            dto.setContent(post.getContent());
            dto.setCreatedAt(post.getCreatedAt());
            List<Comment> comment = commentRepository.findByPostId(post.getId());
            List<GetCommentDTO> commentDTOS = comment.stream().map(c -> {
                GetCommentDTO commentDTO = new GetCommentDTO();
                commentDTO.setContent(c.getContent());
                return commentDTO;
            }).collect(Collectors.toList());
            dto.setComments(commentDTOS);
            return dto;
        }).collect(Collectors.toList());
    }

    public GetPostDTO getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        GetPostDTO dto = new GetPostDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        dto.setCreatedAt(post.getCreatedAt());
        return dto;
    }

    public void deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        postRepository.delete(post);
    }
}