import { useState, useEffect } from 'react';
import Comment from './Comment';
import { usePostContext } from '../pages/Post';
import { CreateComment } from '../services/CommentService';
import { CommentType } from '../types/types';

const CommentSection = () => {
  const { post } = usePostContext();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keep local comments state in sync with post comments
  useEffect(() => {
    if (post?.comments) {
      setComments(post.comments);
    }
  }, [post?.comments]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !post) return;
    
    try {
      setIsSubmitting(true);
      const commentData = { content: newComment.trim() };
      const createdComment = await CreateComment(post.id, commentData);
      
      // Update local comments state
      setComments(prevComments => [...prevComments, createdComment]);
      
      // Clear the input field
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-medium mb-4">Comments ({comments.length})</h3>
      {comments.length > 0 ? (
        <div className="comments-list">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
      )}
      
      <form onSubmit={handleSubmitComment} className="mt-4">
        <div className="flex flex-col space-y-2">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="self-end px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
            disabled={isSubmitting || !newComment.trim()}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;