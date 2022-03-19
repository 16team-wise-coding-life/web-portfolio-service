import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

function CertificateCard({ certificate, setIsEditing, isEditable }) {
  const handleClick = e => {
    e.preventDefault();
    setIsEditing(true);
  };

  const convertDate = date => {
    const seperatedDate = date.split(/T|-/);
    const [year, month, day] = seperatedDate;
    return `${year}-${month}-${day}`;
  };

  const convertedDate = convertDate(certificate.when_date);

  return (
    <>
      <Card.Text>
        <Row className='align-items-center'>
          <Col>
            <span>{certificate.title}</span>
            <br />
            <span className='text-muted'>{certificate.description}</span>
            <br />
            <span className='text-muted'>{convertedDate}</span>
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

export default CertificateCard;
