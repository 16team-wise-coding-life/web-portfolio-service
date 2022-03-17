import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import CertificateCard from './CertificateCard';
import * as Api from '../../api';

function Certificates({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    Api.get(`certificatelist/${portfolioOwnerId}`).then(res => setCertificates(res.data));
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>수상이력</Card.Title>
          {certificates.map(certificate => {
            return <CertificateCard key={certificate._id} certificateCard={certificate} isEditable={isEditable} />;
          })}
          <Row className='mt-3 text-center mb-4'>
            <Col>{/*<Button onClick={() => setIsAdding(true)}>+</Button>*/}</Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default Certificates;
