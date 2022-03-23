import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import * as Api from '../../api';

function CertificateCard({ certificate, setIsEditing, isEditable, setIsDeleted }) {
  const handleDeleteClick = () => {
    Api.delete(`certificates/${certificate._id}`).then(res => {
      console.log(res.data);
      setIsDeleted(true);
    });
  };
  const convertDate = date => {
    const seperatedDate = date.split(/T|-/);
    const [year, month, day] = seperatedDate;
    return `${year}-${month}-${day}`;
  };

  const convertedDate = convertDate(certificate.when_date);

  return (
    <Card.Text>
      <Row className='align-items-center'>
        <Col>
          <span>{certificate.title}</span>
          <br />
          <span className='text-muted'>{certificate.description}</span>
          <br />
          <span className='text-muted'>{convertedDate}</span>
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
  );
}

export default CertificateCard;
