import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';

function CertificateEditForm({ certificate, setCertificate, setIsEditing }) {
  const { _id, title, description, when_date } = certificate;
  const [selectedDate, setSelectedDate] = useState(new Date(when_date));

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await Api.put(`certificates/${_id}`, { title, description, when_date: selectedDate });
      setCertificate(res.data);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='certificateEditTitle' className='mt-3'>
        <Form.Control type='text' placeholder='자격증 제목' value={title} onChange={e => setCertificate({ ...certificate, title: e.target.value })} />
      </Form.Group>

      <Form.Group controlId='certificateEditDescription' className='mt-3'>
        <Form.Control type='text' placeholder='상세내역' value={description} onChange={e => setCertificate({ ...certificate, description: e.target.value })} />
      </Form.Group>

      <Form.Group controlId='certificateEditDate' className='mb-3 mt-3'>
        <DatePicker selected={selectedDate} dateFormat='yyyy/MM/dd' onChange={date => setSelectedDate(date)} />
      </Form.Group>

      <Form.Group as={Row} className='mt-3 text-center'>
        <Col>
          <Button variant='primary' type='submit' className='me-2'>
            확인
          </Button>
          <Button variant='secondary' onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateEditForm;
