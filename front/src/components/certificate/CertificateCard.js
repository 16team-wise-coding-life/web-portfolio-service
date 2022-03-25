import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

function CertificateCard({ certificate, setIsEditing, isEditable, handleDeleteClick }) {
  const convertDate = date => {
    const seperatedDate = date.split(/T|-/);
    const [year, month, day] = seperatedDate;
    return `${year}-${month}-${day}`;
  };

  return (
    <Card.Text>
      <Row className='align-items-center'>
        <Col>
          <span>{certificate.title}</span>
          <br />
          <span className='text-muted'>{certificate.description}</span>
          <br />
          <span className='text-muted'>{convertDate(certificate.when_date)}</span>
        </Col>
        {isEditable && (
          <>
            <Col xs='auto' lg='1'>
              <Button variant='outline-info' size='sm' onClick={() => setIsEditing(true)}>
                편집
              </Button>
            </Col>
            <Col xs='auto' lg='1'>
              <Button variant='outline-danger' size='sm' onClick={() => handleDeleteClick(certificate._id)}>
                삭제
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
