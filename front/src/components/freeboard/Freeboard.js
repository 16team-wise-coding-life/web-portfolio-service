import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Button, Form, ListGroup, Row, Col, Card } from 'react-bootstrap';

import * as Api from '../../api';
import { UserStateContext } from '../../App';

function Freeboard() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!userState.user) {
      navigate('/login');
      return;
    }
    Api.get('freeboardlist').then(res => setPosts(res.data));
  }, [userState, navigate]);

  return (
    <Container fluid>
      <Card>
        <Card.Header>자유게시판 </Card.Header>
        <ListGroup variant="flush">
          {posts.map(post => (
            <ListGroup.Item onClick={() => navigate(`/freeboard/${post._id}`)}>
              {post.title} {post.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Form.Group as={Row} className="mt-3 text-center">
        <Col>
          <Button variant="primary" type="submit" className="me-2" onClick={() => navigate(`/freeboard/create`)}>
            게시글 작성
          </Button>
        </Col>
      </Form.Group>
    </Container>
  );
}

export default Freeboard;
