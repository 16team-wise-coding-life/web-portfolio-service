import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';

function CertificateAddForm({ setCertificates, portfolioOwnerId, setIsAdding }) {
  const [tempCertificate, setTempCertificate] = useState({ title: '', description: '', when_date: new Date() });

  const handleCertificateValue = (name, value) => {
    setTempCertificate(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    Api.post('certificate/create', {
      user_id: portfolioOwnerId,
      ...tempCertificate,
    }).then(res => {
      setCertificates(prev => [...prev, res.data]);
      setIsAdding(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='certificateAddTitle' className='mt-3'>
        <Form.Control type='text' placeholder='자격증 제목' value={tempCertificate.title} onChange={e => handleCertificateValue('title', e.target.value)} />
      </Form.Group>

      <Form.Group controlId='certificateAddDescription' className='mt-3'>
        <Form.Control type='text' placeholder='상세내역' value={tempCertificate.description} onChange={e => handleCertificateValue('description', e.target.value)} />
      </Form.Group>

      <Form.Group controlId='certificateAddDate' className='mb-3 mt-3'>
        <DatePicker selected={tempCertificate.when_date} dateFormat='yyyy/MM/dd' onChange={date => handleCertificateValue('when_date', date)} />
      </Form.Group>

      <Form.Group as={Row} className='mt-3 text-center'>
        <Col>
          <Button variant='primary' type='submit' className='me-2'>
            확인
          </Button>
          <Button variant='secondary' onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateAddForm;
