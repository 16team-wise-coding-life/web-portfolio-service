import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { UserStateContext } from '../../App';
import * as Api from '../../api';

function PostEditForm() {
  const navigate = useNavigate();
  const params = useParams();
  const userState = useContext(UserStateContext);
  const [postInfo, setPostInfo] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchPostInfo = async postId => {
    const res = await Api.get('freeboard', postId);
    const postData = res.data;
    setPostInfo(postData);
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    if (!userState.user) {
      navigate('/login');
      return;
    }
    const postId = params.postId;
    console.log(postId);
    fetchPostInfo(postId);
  }, [params, userState, navigate]);

  const handlePostValue = (name, value) => {
    setPostInfo({ ...postInfo, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    try {
      Api.put(`freeboard/${postInfo._id}`, {
        ...postInfo,
      }).then(navigate(`/freeboard/${postInfo._id}`));
    } catch (error) {
      console.log(error);
    }
  };

  if (!isFetchCompleted) {
    return 'loading...';
  }

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group controlId="postAddTitle">
        <Form.Control type="text" name="title" value={postInfo.title} onChange={e => handlePostValue('title', e.target.value)} />
      </Form.Group>
      <Form.Group controlId="postAddContext">
        <Form.Control type="textarea" style={{ height: '500px' }} name="content" value={postInfo.content} onChange={e => handlePostValue('content', e.target.value)} />
      </Form.Group>
      <Form.Group as={Row} className="mt-3 text-center">
        <Col>
          <Button variant="primary" type="submit" className="me-2">
            등록
          </Button>
          <Button variant="secondary" onClick={() => navigate(`/freeboard/${postInfo._id}`)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default PostEditForm;