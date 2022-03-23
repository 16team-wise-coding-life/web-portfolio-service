import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  const [userImage, setUserImage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('image', userImage);

    const res = await Api.form_put(`users/${user.id}`, formData);

    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control type="text" placeholder="이름" value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control type="text" placeholder="정보, 인사말" value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="userEditImage" className="mb-3">
            <Form.Label>이미지 바꾸기</Form.Label>
            <Form.Control type="file" size="sm" onChange={e => setUserImage(e.target.files[0])} />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
