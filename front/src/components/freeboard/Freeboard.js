import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Button, Form, ListGroup, Row, Col, Card, ButtonGroup } from 'react-bootstrap';

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
        <Card.Header className="text-center">자유게시판</Card.Header>
        <ListGroup variant="flush">
          {posts.map(post => (
            <ListGroup.Item key={post._id} onClick={() => navigate(`/freeboard/${post._id}`)}>
              <Row>
                <Col md={4}>{post.title}</Col> <Col md={{ span: 4, offset: 4 }}>{post.name}</Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Container className="mt-3 text-center">
        <Button variant="primary" className="me-2 float-right" onClick={() => navigate(`/freeboard/create`)}>
          게시글 작성
        </Button>
      </Container>
    </Container>
  );
}

export default Freeboard;
