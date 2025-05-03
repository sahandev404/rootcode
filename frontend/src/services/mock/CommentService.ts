import { CommentForm, CommentType } from "../../types/types";
import * as PostService from "./PostService";

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Keep track of mock posts data by getting it from the PostService mock
let mockPosts: any[] = [];

// Initialize posts data
const refreshPostsData = async () => {
  mockPosts = await PostService.getPosts();
};

// Make sure we have the latest posts data
refreshPostsData();

export const CreateComment = async (postId: string, comment: CommentForm) => {
  try {
    // Simulate network delay
    await delay(300);
    
    // Refresh posts data to ensure we have the latest
    await refreshPostsData();
    
    // Find the post to add the comment to
    const postIndex = mockPosts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
      throw new Error("Post not found");
    }
    
    // Create new comment with current timestamp
    const newComment: CommentType = {
      id: Date.now().toString(),
      content: comment.content,
      createdAt: new Date().toISOString()
    };
    
    // Add comment to the post directly through the PostService
    // This ensures data consistency
    mockPosts[postIndex].comments.push(newComment);
    
    // Update the post with the new comment
    await PostService.updatePost(postId, {
      title: mockPosts[postIndex].title,
      content: mockPosts[postIndex].content
    });
    
    return {...newComment};
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

// Additional comment functions that could be added in the future:

export const getComments = async (postId: string) => {
  try {
    await delay(200);
    await refreshPostsData();
    
    const post = mockPosts.find(post => post.id === postId);
    if (!post) {
      throw new Error("Post not found");
    }
    return [...post.comments];
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

export const deleteComment = async (postId: string, commentId: string) => {
  try {
    await delay(250);
    await refreshPostsData();
    
    const postIndex = mockPosts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
      throw new Error("Post not found");
    }
    
    const commentIndex = mockPosts[postIndex].comments.findIndex(
      (comment: any) => comment.id === commentId
    );
    
    if (commentIndex === -1) {
      throw new Error("Comment not found");
    }
    
    const deletedComment = mockPosts[postIndex].comments[commentIndex];
    mockPosts[postIndex].comments.splice(commentIndex, 1);
    
    // Update the post to persist changes
    await PostService.updatePost(postId, {
      title: mockPosts[postIndex].title,
      content: mockPosts[postIndex].content
    });
    
    return {success: true, deletedComment};
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}