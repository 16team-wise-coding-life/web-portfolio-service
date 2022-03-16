import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import * as Api from '../../api';

function Award({ award, setIsEditing, isEditable }) {
  const handleClick = e => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <>
      <Card.Text>
        <Row className='align-items-center'>
          <Col className='mr-4'>
            <span>{award.title}</span>
            <br />
            <span className='text-muted'>{award.description}</span>
          </Col>
          <Col>
            {isEditable && (
              <Button variant='outline-info' onClick={handleClick}>
                편집
              </Button>
            )}
          </Col>
        </Row>
      </Card.Text>
    </>
  );
}

export default Award;
