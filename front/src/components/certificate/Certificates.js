import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import CertificateCard from './CertificateCard';
import CertificateAddForm from './CertificateAddForm';

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
          <Card.Title>자격증</Card.Title>
          {certificates.map(certificate => {
            return <CertificateCard key={certificate._id} certificateCard={certificate} isEditable={isEditable} />;
          })}
          <Row className='mt-3 text-center mb-4'>
            <Col>{isEditable && <Button onClick={() => setIsAdding(true)}>+</Button>}</Col>
          </Row>
          {isAdding && <CertificateAddForm certificates={certificates} setCertificates={setCertificates} portfolioOwnerId={portfolioOwnerId} setIsAdding={setIsAdding} />}
        </Card.Body>
      </Card>
    </>
  );
}

export default Certificates;
