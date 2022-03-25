import React, { useState, useEffect } from 'react';
import UserEditForm from './UserEditForm';
import UserCard from './UserCard';
import * as Api from '../../api';
import { UserSkeleton } from '../Skeletons';

function User({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get('users', portfolioOwnerId).then(res => {
      setUser(res.data);
      setIsFetchCompleted(true);
    });
  }, [portfolioOwnerId]);

  if (!isFetchCompleted) {
    return <UserSkeleton />;
  }

  return <>{isEditing ? <UserEditForm user={user} setIsEditing={setIsEditing} setUser={setUser} /> : <UserCard user={user} setIsEditing={setIsEditing} isEditable={isEditable} />}</>;
}

export default User;
