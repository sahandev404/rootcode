import { PostForm, PostType } from "../../types/types";

// Sample mock data with current dates (May 2025)
const mockPosts: PostType[] = [
  {
    id: "1",
    title: "Getting Started with React",
    content: "React is a JavaScript library for building user interfaces. It's declarative, efficient, and flexible.",
    createdAt: new Date(2025, 4, 1).toISOString(),
    comments: [
      {
        id: "101",
        content: "Great introduction to React!",
        createdAt: new Date(2025, 4, 2).toISOString()
      },
      {
        id: "102",
        content: "This helped me understand React better.",
        createdAt: new Date(2025, 4, 3).toISOString()
      }
    ]
  },
  {
    id: "2",
    title: "TypeScript Best Practices",
    content: "TypeScript adds static typing to JavaScript, which helps catch errors early and improves developer experience.",
    createdAt: new Date(2025, 3, 28).toISOString(),
    comments: [
      {
        id: "201",
        content: "TypeScript has been a game changer for our team!",
        createdAt: new Date(2025, 3, 29).toISOString()
      }
    ]
  },
  {
    id: "3",
    title: "Modern CSS Techniques",
    content: "CSS has evolved significantly with features like Grid, Flexbox, and CSS Variables making layouts easier than ever.",
    createdAt: new Date(2025, 3, 25).toISOString(),
    comments: []
  }
];

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getPosts = async () => {
  try {
    // Simulate network delay
    await delay(500);
    return [...mockPosts];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export const getPostById = async (id: string) => {
  try {
    await delay(300);
    const post = mockPosts.find(post => post.id === id);
    if (!post) {
      throw new Error("Post not found");
    }
    return {...post};
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

export const createPost = async (post: PostForm) => {
  try {
    await delay(400);
    const newPost: PostType = {
      id: Date.now().toString(),
      title: post.title,
      content: post.content,
      createdAt: new Date().toISOString(),
      comments: []
    };
    mockPosts.unshift(newPost);
    return {...newPost};
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export const updatePost = async (id: string, post: PostForm) => {
  try {
    await delay(300);
    const postIndex = mockPosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      throw new Error("Post not found");
    }
    
    // Update the post but keep its ID, comments and creation date
    mockPosts[postIndex] = {
      ...mockPosts[postIndex],
      title: post.title,
      content: post.content
    };
    
    return {...mockPosts[postIndex]};
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

export const deletePost = async (id: string) => {
  try {
    await delay(350);
    const postIndex = mockPosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      throw new Error("Post not found");
    }
    
    const deletedPost = mockPosts[postIndex];
    mockPosts.splice(postIndex, 1);
    
    return {success: true, deletedPost};
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}