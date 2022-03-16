import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

function Award({ setIsEditing }) {
  const handleClick = e => {
    e.preventDefault();
    setIsEditing(true);
  };
  return (
    <>
      <Card.Text>
        <Row className='align-items-center'>
          <Col className='mr-4'>
            <span>개근상</span>
            <br />
            <span className='text-muted'>빠짐없이 출석!</span>
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
