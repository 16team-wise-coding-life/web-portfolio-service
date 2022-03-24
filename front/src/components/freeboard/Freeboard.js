import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Button, ListGroup, Card } from 'react-bootstrap';

import * as Api from '../../api';
import { UserStateContext } from '../../App';

function Freeboard() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [posts, setPosts] = useState([]);

  const fetchPostsInfo = async () => {
    try {
      const { data: tempPosts } = await Api.get('freeboardlist');
      setPosts(tempPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userState.user) {
      navigate('/login');
      return;
    }
    fetchPostsInfo();
  }, [userState, navigate]);

  return (
    <Container>
      <Card>
        <Card.Header>자유게시판 </Card.Header>
        <ListGroup variant="flush">
          {posts.map(post => (
            <ListGroup.Item key={post._id} onClick={() => navigate(`/freeboard/${post._id}`)}>
              {post.title} {post.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Button variant="primary" className="mt-3" onClick={() => navigate(`/freeboard/create`)}>
        게시글 작성
      </Button>
    </Container>
  );
}

export default Freeboard;
