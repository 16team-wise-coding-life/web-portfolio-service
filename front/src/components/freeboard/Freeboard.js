import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Button, ListGroup, Row, Col, Card, ToggleButton } from 'react-bootstrap';

import * as Api from '../../api';
import { UserStateContext } from '../../App';

function Freeboard() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [checked, setChecked] = useState(false);

  const fetchPostsInfo = async () => {
    try {
      const { data: tempAllPosts } = await Api.get('freeboardlist');
      setAllPosts(tempAllPosts);
      const { data: tempMyPosts } = await Api.get('freeboardlist', userState.user?.id);
      setMyPosts(tempMyPosts);
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

  const toggleCheck = () => {
    setChecked(!checked);
  };

  return (
    <Container>
      <Container className="mt-3">
        <ToggleButton className="mb-2" id="toggle-check" type="checkbox" variant="outline-primary" checked={checked} onChange={toggleCheck}>
          {checked ? '모든 게시글 보기' : '내가 쓴 게시글 보기'}
        </ToggleButton>
        <Button variant="primary" style={{ position: 'absolute', right: 55, marginRight: '30px' }} onClick={() => navigate(`/freeboard/create`)}>
          게시글 작성
        </Button>
      </Container>
      <Card>
        <Card.Header className="text-center">자유게시판</Card.Header>
        <ListGroup variant="flush">
          {(checked ? myPosts : allPosts).map(post => (
            <ListGroup.Item key={post._id} onClick={() => navigate(`/freeboard/${post._id}`)}>
              <Row>
                <Col md={4}>{post.title}</Col> <Col md={{ span: 4, offset: 4 }}>{post.name}</Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default Freeboard;
