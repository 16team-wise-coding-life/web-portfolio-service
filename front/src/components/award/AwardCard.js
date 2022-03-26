import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

function AwardCard({ award, setIsEditing, isEditable, handleDeleteClick }) {
  return (
    <Row className='align-items-center'>
      <Col>
        <Card.Text className='mb-2 mt-3'>{award.title}</Card.Text>
        <Card.Subtitle className='text-muted'>{award.description}</Card.Subtitle>
      </Col>
      {isEditable && (
        <>
          <Col xs='auto' lg='1'>
            <Button className='mr-3' variant='outline-info' size='sm' onClick={() => setIsEditing(true)}>
              편집
            </Button>
          </Col>
          <Col xs='auto' lg='1'>
            <Button className='mr-3' variant='outline-danger' size='sm' onClick={() => handleDeleteClick(award._id)}>
              삭제
            </Button>
          </Col>
        </>
      )}
    </Row>
  );
}

export default AwardCard;
