import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Form, Col, Row } from 'react-bootstrap';

import * as Api from '../../api';
import { UserStateContext } from '../../App';

function PostAddForm({ portfolioOwnerId }) {
  const navigate = useNavigate();
  const [tempPost, setTempPost] = useState({ title: '', content: '' });
  const userState = useContext(UserStateContext);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate('/login');
      return;
    }
  }, [userState, navigate]);

  const handlePostValue = (name, value) => {
    setTempPost({ ...tempPost, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    Api.post('freeboard/create', {
      user_id: userState.user.id,
      ...tempPost,
    }).then(navigate(`/freeboard`));
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group controlId="postAddTitle">
        <Form.Control type="text" placeholder="제목" name="title" value={tempPost.title} onChange={e => handlePostValue(e.target.name, e.target.value)} />
      </Form.Group>
      <Form.Group controlId="postAddContext">
        <Form.Control type="textarea" style={{ height: '500px' }} placeholder="내용" name="content" value={tempPost.content} onChange={e => handlePostValue(e.target.name, e.target.value)} />
      </Form.Group>
      <Form.Group as={Row} className="mt-3 text-center">
        <Col>
          <Button variant="primary" type="submit" className="me-2">
            등록
          </Button>
          <Button variant="secondary" onClick={() => navigate(`/freeboard`)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default PostAddForm;
