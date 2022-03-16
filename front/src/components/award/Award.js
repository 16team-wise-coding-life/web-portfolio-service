import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import * as Api from '../../api';

function Award({ title, description, setIsEditing }) {
  const handleClick = e => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <>
      <Card.Text>
        <Row className='align-items-center'>
          <Col className='mr-4'>
            <span>{title}</span>
            <br />
            <span className='text-muted'>{description}</span>
          </Col>
          <Col>
            {/* isEditable && 버튼*/}
            <Button variant='outline-info' onClick={handleClick}>
              편집
            </Button>
          </Col>
        </Row>
      </Card.Text>
    </>
  );
}

export default Award;
