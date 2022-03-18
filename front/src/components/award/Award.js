import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

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
          <Col xs lg='1'>
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
