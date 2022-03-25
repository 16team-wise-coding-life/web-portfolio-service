import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

function GuestbookCard({ guestbook, setIsEditing, isEditable, handleDeleteClick }) {
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <Card.Header className='mt-2'>"{guestbook.user_name}"님이 들렀다 가셨어요.</Card.Header>
          <Card.Subtitle className='text-muted mt-1 mb-3'>{guestbook.content}</Card.Subtitle>
        </Col>
      </Row>
      {isEditable && (
        <Row>
          <Col xs='auto' lg='1'>
            <Button className='mr-3' variant='outline-info' size='sm' onClick={() => setIsEditing(true)}>
              편집
            </Button>
          </Col>
          <Col xs='auto' lg='1'>
            <Button className='mr-3' variant='outline-danger' size='sm' onClick={() => handleDeleteClick(guestbook._id)}>
              삭제
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default GuestbookCard;
