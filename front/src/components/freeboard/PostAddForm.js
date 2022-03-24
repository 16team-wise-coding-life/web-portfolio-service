import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Button, Form, Col, Row, Modal } from 'react-bootstrap';

import * as Api from '../../api';
import { UserStateContext } from '../../App';

function PostAddForm({ portfolioOwnerId }) {
  const navigate = useNavigate();
  const [tempPost, setTempPost] = useState({ title: '', content: '' });
  const userState = useContext(UserStateContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      name: userState.user.name,
      ...tempPost,
    }).then(navigate(`/freeboard`));
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col lg={8}>
            <Form onSubmit={handleSubmit} className="mt-3">
              <Form.Group controlId="postAddTitle">
                <Form.Label>제목</Form.Label>
                <Form.Control type="text" placeholder="제목을 입력하세요" name="title" value={tempPost.title} onChange={e => handlePostValue(e.target.name, e.target.value)} />
              </Form.Group>

              <Form.Group controlId="postAddContext">
                <Form.Label>내용</Form.Label>
                <Form.Control
                  type="textarea"
                  style={{ height: '300px' }}
                  placeholder="내용을 입력하세요"
                  name="content"
                  value={tempPost.content}
                  onChange={e => handlePostValue(e.target.name, e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col>
                  <Button variant="primary" className="me-2" onClick={handleShow}>
                    등록
                  </Button>
                  <Button variant="secondary" onClick={() => navigate(`/freeboard`)}>
                    취소
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>작성완료</Modal.Title>
        </Modal.Header>
        <Modal.Body>게시글을 올립니다.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" type="submit">
            완료
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostAddForm;
