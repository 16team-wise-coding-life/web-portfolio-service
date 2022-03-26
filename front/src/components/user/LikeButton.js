import React from 'react';
import { ToggleButton } from 'react-bootstrap';

function LikeButton({ isLiked, handleLikeChange, howManyLiked }) {
  return (
    <ToggleButton className='sm' id='toggle-check' type='checkbox' variant='outline-primary' checked={isLiked} onClick={() => handleLikeChange(isLiked)}>
      {isLiked ? '좋아요b ' + howManyLiked : '좋아요b ' + howManyLiked}
    </ToggleButton>
  );
}

export default LikeButton;
