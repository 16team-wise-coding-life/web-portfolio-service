import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import Certificate from './Certificate';
import CertificateAddForm from './CertificateAddForm';

import * as Api from '../../api';

function Certificates({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    Api.get(`certificatelist/${portfolioOwnerId}`).then(res => setCertificates(res.data));
  }, []);

  useEffect(() => {
    if (isDeleted) {
      Api.get(`certificatelist/${portfolioOwnerId}`).then(res => setCertificates(res.data));
      setIsDeleted(false);
    }
  }, [portfolioOwnerId, isDeleted]);

  return (
    <>
      <Card className='mt-2'>
        <Card.Body>
          <Card.Title>자격증</Card.Title>
          <Card.Text>
            {certificates.map(certificate => {
              return <Certificate key={certificate._id} certificateCard={certificate} isEditable={isEditable} setIsDeleted={setIsDeleted} />;
            })}
          </Card.Text>
          {isEditable && (
            <Row className='mt-3 text-center mb-4'>
              <Col sm={{ span: 20 }}>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}
          {isAdding && <CertificateAddForm certificates={certificates} setCertificates={setCertificates} portfolioOwnerId={portfolioOwnerId} setIsAdding={setIsAdding} />}
        </Card.Body>
      </Card>
    </>
  );
}

export default Certificates;
