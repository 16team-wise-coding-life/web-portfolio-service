import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';

function CertificateAddForm({ certificates, setCertificates, portfolioOwnerId, setIsAdding }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [whenDate, setWhenDate] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const convertDate = () => {
    const seperatedDate = startDate.toISOString().split(/T|-/);
    const [year, month, day] = seperatedDate;
    const convertedDate = `${year}-${month}-${day}`;

    setWhenDate(convertedDate);
  };

  useEffect(() => {
    convertDate();
  }, [convertDate, startDate]);

  const handleSubmit = e => {
    e.preventDefault();

    Api.post('certificate/create', {
      user_id: portfolioOwnerId,
      title,
      description,
      when_date: whenDate,
    }).then(res => {
      setCertificates([...certificates, res.data]);
      setIsAdding(false);
    });
  };

  return (
    <>
      <Card className='mb-2'>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='certificateAddTitle'>
              <Form.Control type='text' placeholder='수상내역' value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='certificateAddDescription'>
              <Form.Control type='text' placeholder='상세내역' value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='certificateAddDate'>
              <DatePicker selected={startDate} dateFormat='yyyy/MM/dd' onChange={date => setStartDate(date)} />
            </Form.Group>

            <Form.Group as={Row} className='mt-3 text-center'>
              <Col>
                <Button variant='primary' type='submit'>
                  확인
                </Button>
                <Button variant='secondary' onClick={() => setIsAdding(false)}>
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

export default CertificateAddForm;