import React from 'react';
import { PostType } from '../types/types';

interface PostProps {
  postDetails: PostType;
}

const Post: React.FC<PostProps> = ({ postDetails }) => {
  return (
    <a href={`/post/${postDetails.id}`} className="post-card border-black border-2 rounded-md mb-4 p-4">
      <h2 className="post-title font-medium mb-2">{postDetails.title}</h2>
      <p className="post-content mb-3">{postDetails.content}</p>
      {/* <div className="post-footer flex justify-between mt-2"> */}
        <p className="comment-count">
          {postDetails.comments?.length} comment{postDetails.comments?.length !== 1 ? 's' : ''}
        </p>
        <p className="post-date">{new Date(postDetails.createdAt).toLocaleDateString()} At {new Date(postDetails.createdAt).toLocaleTimeString()}</p>
      {/* </div> */}
    </a>
  );
};

export default Post;