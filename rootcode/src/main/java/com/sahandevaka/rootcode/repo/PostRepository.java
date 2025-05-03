package com.sahandevaka.rootcode.repo;

import com.sahandevaka.rootcode.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}