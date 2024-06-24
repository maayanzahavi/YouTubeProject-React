// Comment component
import React, { useState } from 'react';
import './Comment.css';
import DeleteIcon from '../../../../../assets/icons/DeleteIcon';
import EditIcon from '../../../../../assets/icons/EditIcon';
import SaveIcon from '../../../../../assets/icons/CheckIcon';
import ProfilePicture from '../../../../ProfilePicture/ProfilePicture';

const Comment = ({ userEmail, users, date, content, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  // Set the comment to editing mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Update the comment
  const handleSave = () => {
    onEdit(editContent);
    setIsEditing(false);
  };

  const owner = users.find((user) => user.email === userEmail);

  if (!owner) {
    return null; 
  }

  return (
    <div className="comment-item">
      <ProfilePicture user={owner} />
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-name">{owner.displayName}</span>
          <span className="comment-date">{date}</span>
        </div>
        {isEditing ? (
          <input
            type="text"
            className="comment-edit-input"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        ) : (
          <div className="comment-text">{content}</div>
        )}
        <div className="comment-actions-container">
          <button className="comment-action" onClick={onDelete}>
            <DeleteIcon/>
          </button>
          {isEditing ? (
            <button className="comment-action" onClick={handleSave}>
              <SaveIcon />
            </button>
          ) : (
            <button className="comment-action" onClick={handleEdit}>
              <EditIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
