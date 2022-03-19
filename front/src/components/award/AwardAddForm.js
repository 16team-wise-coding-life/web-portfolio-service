import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

function AwardAddForm({ awards, setAwards, portfolioOwnerId, setIsAdding }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    Api.post('award/create', {
      user_id: portfolioOwnerId,
      title,
      description,
    }).then(res => {
      setAwards([...awards, res.data]);
      setIsAdding(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit} className='mt-3'>
      <Form.Group controlId='awardAddTitle'>
        <Form.Control type='text' placeholder='수상내역' value={title} onChange={e => setTitle(e.target.value)} />
      </Form.Group>

      <Form.Group controlId='awardAddDescription' className='mt-3'>
        <Form.Control type='text' placeholder='상세내역' value={description} onChange={e => setDescription(e.target.value)} />
      </Form.Group>

      <Form.Group as={Row} className='mt-3 text-center'>
        <Col>
          <Button variant='primary' type='submit' className='me-2'>
            확인
          </Button>
          <Button variant='secondary' onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardAddForm;
