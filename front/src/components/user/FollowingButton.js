import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';

function FollowingButton({ isFollowing, handleFollowChange }) {
  return (
    <Button size="sm" onClick={() => handleFollowChange(isFollowing)}>
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
}

export default FollowingButton;
