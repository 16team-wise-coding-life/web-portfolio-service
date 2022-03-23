import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Button, Form, ListGroup, Row, Col } from 'react-bootstrap';

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
    // TODO : freeboard내용 받아와야함
    Api.get('freeboardlist').then(res => setPosts(res.data));
  }, [userState, navigate]);

  return (
    <Container fluid>
      {posts.map(post => (
        <Row>
          <Col xs={8} sm={8}>
            {post.title}
          </Col>
          <Col sx={4} sm={4}>
            {post.created_at}
          </Col>
        </Row>
      ))}

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
