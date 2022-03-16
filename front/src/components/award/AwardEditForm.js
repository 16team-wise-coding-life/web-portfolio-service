import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

function AwardEditForm({ title, setTitle, description, setDescription, id, setIsEditing }) {
  const handleSubmit = async e => {
    e.preventDefault();
    // title, description 정보 서버에 보내서 변경하기 (PUT -> awards/:id)
    const res = await Api.put(`awards/${id}`, { title, description });
    console.log(res.data);
    setTitle(res.data.title);
    setDescription(res.data.description);
    setIsEditing(false);
  };

  return (
    <>
      <Card className='mb-2'>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='useEditTitle'>
              <Form.Control type='text' placeholder='수상내역' value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='userEditDescription'>
              <Form.Control type='text' placeholder='상세내역' value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group as={Row} className='mt-3 text-center'>
              <Col>
                <Button variant='primary' type='submit'>
                  확인
                </Button>
                <Button variant='secondary' onClick={() => setIsEditing(false)}>
                  취소
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default AwardEditForm;
