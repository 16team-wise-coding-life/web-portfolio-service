import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

function AwardAddForm({ awards, setAwards, portfolioOwnerId, setIsAdding }) {
  const [tempAward, setTempAward] = useState({ title: '', description: '' });

  const handleAwardValue = (name, value) => {
    setTempAward({ ...tempAward, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    Api.post('award/create', {
      user_id: portfolioOwnerId,
      ...tempAward,
    }).then(res => {
      setAwards([...awards, res.data]);
      setIsAdding(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit} className='mt-3'>
      <Form.Group controlId='awardAddTitle'>
        <Form.Control type='text' placeholder='수상내역' name='title' value={tempAward.title} onChange={e => handleAwardValue(e.target.name, e.target.value)} />
      </Form.Group>

      <Form.Group controlId='awardAddDescription' className='mt-3'>
        <Form.Control type='text' placeholder='상세내역' name='description' value={tempAward.description} onChange={e => handleAwardValue(e.target.name, e.target.value)} />
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
