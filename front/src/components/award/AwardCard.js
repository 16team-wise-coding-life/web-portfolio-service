import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

function AwardCard({ award, setIsEditing, isEditable, handleDeleteClick }) {
  return (
    <>
      <Card.Text>
        <Row className='align-items-center'>
          <Col>
            <span>{award.title}</span>
            <br />
            <span className='text-muted'>{award.description}</span>
          </Col>
          {isEditable && (
            <>
              <Col xs lg='1'>
                <Button variant='outline-info' size='sm' onClick={() => setIsEditing(true)}>
                  편집
                </Button>
              </Col>
              <Col xs lg='1'>
                <Button variant='outline-danger' size='sm' onClick={() => handleDeleteClick(award._id)}>
                  삭제
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Card.Text>
    </>
  );
}

export default AwardCard;
