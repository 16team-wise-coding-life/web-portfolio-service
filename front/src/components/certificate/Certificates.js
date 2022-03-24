import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import Certificate from './Certificate';
import CertificateAddForm from './CertificateAddForm';

import * as Api from '../../api';

function Certificates({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    try {
      const loadCertificates = async () => {
        const res = await Api.get(`certificatelist/${portfolioOwnerId}`);
        setCertificates(res.data);
      };
      loadCertificates();
    } catch (error) {
      console.log(error);
    }
  }, [portfolioOwnerId]);

  const handleDeleteClick = async _id => {
    try {
      if (window.confirm('자격증 항목을 삭제하시겠습니까?')) {
        await Api.delete(`certificates/${_id}`);
        const res = await Api.get(`certificatelist/${portfolioOwnerId}`);
        setCertificates(res.data);
      }
    } catch (error) {
      alert('자격증 항목을 삭제하지 못했습니다.', error);
    }
  };

  return (
    <>
      <Card className='mt-2'>
        <Card.Body>
          <Card.Title>자격증</Card.Title>
          <Card.Text>
            {certificates.map(certificate => {
              return <Certificate key={certificate._id} certificateCard={certificate} isEditable={isEditable} handleDeleteClick={handleDeleteClick} />;
            })}
          </Card.Text>
          {isEditable && (
            <Row className='mt-3 text-center mb-4'>
              <Col sm={{ span: 20 }}>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}
          {isAdding && <CertificateAddForm setCertificates={setCertificates} portfolioOwnerId={portfolioOwnerId} setIsAdding={setIsAdding} />}
        </Card.Body>
      </Card>
    </>
  );
}

export default Certificates;
