import React, { useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import * as Api from '../../api';

function AwardCard({ award, setIsEditing, isEditable, setIsDeleted }) {
  const handleDeleteClick = e => {
    //delete '/awards/:id'
    console.log(award);
    Api.delete(`awards/${award.id}`).then(res => {
      console.log(res.data);
      setIsDeleted(true);
    });
  };

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
                <Button variant='outline-danger' size='sm' onClick={handleDeleteClick}>
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
