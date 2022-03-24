import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import * as Api from '../../api';

function FollowingButton() {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <Button size='sm' style={{ position: 'absolute', right: 0, marginRight: '30px' }}>
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
}

export default FollowingButton;
