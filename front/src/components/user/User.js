import React, { useState, useEffect, useContext } from 'react';
import UserEditForm from './UserEditForm';
import UserCard from './UserCard';
import * as Api from '../../api';
import { UserSkeleton } from '../Skeletons';
import { UserStateContext } from '../../App';

function User({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [followingList, setFollowingList] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const userState = useContext(UserStateContext);

  const checkFollowing = (portfolioOwnerId, followingList) => {
    if (followingList.some(follow => follow.following_id === portfolioOwnerId)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await Api.get('users', portfolioOwnerId);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadFollowingLists = async () => {
    try {
      const res = await Api.get(`followinglist/${userState.user.id}`);
      setFollowingList(res.data);
      checkFollowing(portfolioOwnerId, res.data);
      setIsFetchCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
    loadFollowingLists();
  }, [portfolioOwnerId]);

  const handleFollowChange = async isFollowing => {
    try {
      const body = {
        user_id: userState.user.id,
        following_id: portfolioOwnerId,
      };
      if (!isFollowing) {
        await Api.post('following/create', body);
      } else {
        // 팔로우 취소
        await Api.delete('following/delete', '', body);
      }
      loadFollowingLists();
    } catch (error) {
      console.log(error);
    }
    // 팔로우하기
  };

  if (!isFetchCompleted) {
    return <UserSkeleton />;
  }

  return (
    <>
      {isEditing ? (
        <UserEditForm user={user} setIsEditing={setIsEditing} setUser={setUser} />
      ) : (
        <UserCard user={user} setIsEditing={setIsEditing} isEditable={isEditable} isFollowing={isFollowing} handleFollowChange={handleFollowChange} />
      )}
    </>
  );
}

export default User;
