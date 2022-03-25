import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, ToggleButton } from 'react-bootstrap';

import * as Api from '../../api';
import UserCard from './UserCard';
import { UserStateContext } from '../../App';

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [checked, setChecked] = useState(false);

  const loadUserList = async () => {
    try {
      const { data: tempAllUsers } = await Api.get('userlist');
      setUsers(tempAllUsers);
      const { data: tempFollowingUsers } = await Api.get(`followinglist/${userState.user?.id}`);
      setFollowingUsers(tempFollowingUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate('/login');
      return;
    }
    loadUserList();
  }, [userState, navigate]);

  const toggleCheck = () => {
    setChecked(!checked);
  };

  return (
    <Container fluid>
      <ToggleButton className='mb-2' id='toggle-check' type='checkbox' variant='outline-primary' checked={checked} onChange={toggleCheck}>
        {checked ? '모든 사용자 보기' : '내가 팔로우한 사용자 보기'}
      </ToggleButton>
      <Row xs='auto' className='jusify-content-center'>
        {checked
          ? followingUsers.map(user => {
              const followingId = user.following_id;
              const followingUser = users.filter(user => user.id === followingId)[0];
              return <UserCard key={followingUser._id} user={followingUser} isNetwork />;
            })
          : users.map(user => <UserCard key={user.id} user={user} isNetwork />)}
      </Row>
    </Container>
  );
}

export default Network;
