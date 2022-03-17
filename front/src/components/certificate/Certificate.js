import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

function Certificate({ certificate, setIsEditing, isEditable }) {
  const handleClick = e => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <>
      <Card.Text>
        <Row className='align-items-center'>
          <Col className='mr-4'>
            <span>{certificate.title}</span>
            <br />
            <span className='text-muted'>{certificate.description}</span>
            <br />
            <span className='text-muted'>{certificate.when_date}</span>
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

export default Certificate;
