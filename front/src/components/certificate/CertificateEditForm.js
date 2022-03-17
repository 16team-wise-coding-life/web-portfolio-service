import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';

function CertificateEditForm({ certificate, setCertificate, setIsEditing }) {
  const { _id, title, description, when_date } = certificate;
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    convertDate();
  }, [startDate]);

  const convertDate = () => {
    const seperatedDate = startDate.toISOString().split(/T|-/);
    const [year, month, day] = seperatedDate;
    const convertedDate = `${year}-${month}-${day}`;

    setCertificate({ ...certificate, when_date: convertedDate });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await Api.put(`certificates/${_id}`, { title, description, when_date });
      setCertificate({
        ...certificate,
        title,
        description,
        when_date,
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card className='mb-2'>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='certificateEditTitle'>
              <Form.Control type='text' placeholder='자격증 제목' value={title} onChange={e => setCertificate({ ...certificate, title: e.target.value })} />
            </Form.Group>

            <Form.Group controlId='certificateEditDescription'>
              <Form.Control type='text' placeholder='상세내역' value={description} onChange={e => setCertificate({ ...certificate, description: e.target.value })} />
            </Form.Group>

            <Form.Group controlId='certificateEditDate'>
              <DatePicker selected={startDate} dateFormat='yyyy/MM/dd' onChange={date => setStartDate(date)} />
            </Form.Group>

            <Form.Group as={Row} className='mt-3 text-center'>
              <Col>
                <Button variant='primary' type='submit'>
                  확인
                </Button>
                <Button variant='secondary' onClick={() => setIsEditing(false)}>
                  취소
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default CertificateEditForm;
