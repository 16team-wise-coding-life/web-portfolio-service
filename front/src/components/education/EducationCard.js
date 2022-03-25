import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

function EducationCard({ education, setIsEditing, isEditable, handleDeleteClick }) {
  return (
    <Card.Text className='mb-2 mt-3'>
      <Row className='align-items-center'>
        <Col>
          <span>{education.school}</span>
          <br />
          <span className='text-muted'>{`${education.major} (${education.position})`}</span>
        </Col>
        {isEditable && (
          <>
            <Col xs='auto' lg='1'>
              <Button className='mr-3' variant='outline-info' size='sm' onClick={() => setIsEditing(edit => !edit)}>
                편집
              </Button>
            </Col>
            <Col xs='auto' lg='1'>
              <Button className='mr-3' variant='outline-danger' size='sm' onClick={() => handleDeleteClick(education._id)}>
                삭제
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Card.Text>
  );
}
export default EducationCard;
