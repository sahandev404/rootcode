package com.sahandevaka.rootcode.controller;

import com.sahandevaka.rootcode.dto.CommentDTO;
import com.sahandevaka.rootcode.dto.GetCommentDTO;
import com.sahandevaka.rootcode.dto.GetPostDTO;
import com.sahandevaka.rootcode.dto.PostDTO;
import com.sahandevaka.rootcode.service.CommentService;
import com.sahandevaka.rootcode.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<PostDTO> createPost(@Valid @RequestBody PostDTO postDTO) {
        PostDTO createdPost = postService.createPost(postDTO);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GetPostDTO>> getAllPosts() {
        List<GetPostDTO> posts = postService.getAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetPostDTO> getPostById(@PathVariable Long id) {
        GetPostDTO post = postService.getPostById(id);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @PostMapping("/{id}/comments")
        public ResponseEntity<CommentDTO> createComment(@Valid @RequestBody CommentDTO commentDTO) {
        CommentDTO createdComment = commentService.createComment(commentDTO);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    @GetMapping("/post/{postId}/comments")
    public ResponseEntity<List<GetCommentDTO>> getCommentsByPostId(@PathVariable Long postId) {
        List<GetCommentDTO> comments = commentService.getCommentsByPostId(postId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

}