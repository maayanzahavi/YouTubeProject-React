// Comment section component
import React, { useState } from 'react';
import './CommentSection.css';
import Comment from './Comment/Comment';
import { useNavigate } from 'react-router-dom';

const CommentSection = ({ video, user, setVideos, users }) => {
  const [comments, setComments] = useState(video.comments || []);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      // If there's no user logged in, send it to login screen
      navigate('/login-email');
      return;
    }

    // Create a new comment
    if (newComment.trim()) {
      const date = new Date().toLocaleDateString();
      const newCommentObj = {
        user: user.email, 
        date,
        content: newComment,
      };
      const updatedComments = [...comments, newCommentObj];
      setComments(updatedComments);
      addCommentToVideo(video.id, newCommentObj);
      setNewComment('');
      console.log('New comment added:', newCommentObj); 
    }
  };

  // Adding a new comment to the video comments list
  const addCommentToVideo = (videoId, comment) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === videoId) {
          const updatedVideo = { ...video, comments: [...video.comments, comment] };
          console.log('Updating video comments:', updatedVideo.comments); 
          return updatedVideo;
        }
        return video;
      })
    );
  };

  // Updates an edited comment 
  const editCommentInVideo = (videoId, commentIndex, newContent) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId
          ? {
              ...video,
              comments: video.comments.map((comment, index) =>
                index === commentIndex ? { ...comment, content: newContent } : comment,
              ),
            }
          : video,
      ),
    );
  };

    // Delete a comment from the video comments list
    const deleteCommentFromVideo = (videoId, commentIndex) => {
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.id === videoId
            ? {
                ...video,
                comments: video.comments.filter((_, index) => index !== commentIndex),
              }
            : video,
        ),
      );
    };

    // Delete comment from comments list
  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    deleteCommentFromVideo(video.id, index);
  };

  // Updates a video
  const handleEditComment = (index, newContent) => {
    const updatedComments = comments.map((comment, i) =>
      i === index ? { ...comment, content: newContent } : comment,
    );
    setComments(updatedComments);
    editCommentInVideo(video.id, index, newContent);
  };

  return (
    <div className="comment-section">
      <h2 className="comments-title">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment"
          className="comment-input"
        />
        <button type="submit" className="comment-submit-button">
          Submit
        </button>
      </form>
      <div className="comment-list">
        {comments.map((comment, index) => (
          <Comment
            key={index}
            userEmail={comment.user}
            users={users}
            date={comment.date}
            content={comment.content}
            onDelete={() => handleDeleteComment(index)}
            onEdit={(newContent) => handleEditComment(index, newContent)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
