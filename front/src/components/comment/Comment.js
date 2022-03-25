import React, { useState } from 'react';

import CommentCard from './CommentCard';
import CommentEditForm from './CommentEditForm';

function Comment({ commentCard, isEditable, handleDeleteClick }) {
  //board_id 안쓰는디..?
  const { user_id, name, content, created_at, _id: id } = commentCard;
  console.log(commentCard);
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState({ user_id, name, content, created_at, id });

  return (
    <>
      {isEditing ? (
        <CommentEditForm comment={comment} setComment={setComment} setIsEditing={setIsEditing} />
      ) : (
        <CommentCard comment={comment} setIsEditing={setIsEditing} isEditable={isEditable} handleDeleteClick={handleDeleteClick} />
      )}
    </>
  );
}

export default Comment;