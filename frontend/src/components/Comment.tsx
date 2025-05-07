import { CommentType } from '../types/types';


const Comment = ({ comment }: {comment: CommentType}) => {
  console.log(comment.createdAt);

  return (
    <div className="comment border-gray-200 border p-3 rounded-md mb-2">
      <p className="comment-content">{comment.content}</p>
      <div className="comment-footer text-sm text-gray-500 mt-1">
        <span className="comment-date">Posted on {new Date(comment.createdAt).toLocaleDateString()} at {new Date(comment.createdAt).toLocaleTimeString()}</span>        
      </div>
    </div>
  );
};

export default Comment;