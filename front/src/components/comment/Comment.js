import React, { useState } from 'react';

import CommentCard from './CommentCard';
import CommentEditForm from './CommentEditForm';

function Comment({ commentCard, isEditable, setIsDeleted }) {
  //board_id 안쓰는디..?
  const { board_id, user_id, name, content, created_at, _id } = commentCard;

  const [isEditing, setIsEditing] = useState(false);
  // comment useState가 필요한가?
  const [comment, setComment] = useState({ user_id, name, content, created_at, id: _id });

  return (
    <>
      {isEditing ? (
        <CommentEditForm comment={comment} setComment={setComment} setIsEditing={setIsEditing} />
      ) : (
        <CommentCard comment={comment} setIsEditing={setIsEditing} isEditable={isEditable} setIsDeleted={setIsDeleted} />
      )}
    </>
  );
}

export default Comment;
