import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PostType } from '../types/types';

// Create a context with PostType
type PostContextType = {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};

// Create the context with a default value
const PostContext = createContext<PostContextType | undefined>(undefined);

// Provider component that wraps app
export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  )
};

// Custom hook to use the context
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};

export default PostContext;