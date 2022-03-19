import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as Api from '../../api';
import DatePicker from 'react-datepicker';

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const handleSubmit = async e => {
    e.preventDefault();

    const user_id = portfolioOwnerId;
    console.log('portfolioOwnerId', portfolioOwnerId);
    console.log('fromDate', fromDate);
    const from_date = fromDate.toISOString().split('T')[0];
    console.log('from_date', from_date);
    const to_date = toDate.toISOString().split('T')[0];
    console.log('to_date', to_date);

    await Api.post('project/create', {
      user_id,
      title,
      description,
      from_date,
      to_date,
    });

    await Api.get('Projectlist', user_id).then(res => setProjects(res.data));
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="ProjectAddTitle" className="mt-3">
        <Form.Control type="text" placeholder="프로젝트 이름" value={title} onChange={e => setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="ProjectAddMajor" className="mt-3">
        <Form.Control type="text" placeholder="상세내역" value={description} onChange={e => setDescription(e.target.value)} />
      </Form.Group>
      <Form.Group as={Row} className="mt-3">
        <Col>
          <DatePicker selected={fromDate} dateFormat="yyyy-MM-dd" onChange={date => setFromDate(date)} />{' '}
        </Col>
        <Col>
          <DatePicker selected={toDate} dateFormat="yyyy-MM-dd" onChange={date => setToDate(date)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mt-3">
        <Row>
          <Col>
            <Button variant="primary" type="submit" className="me-2">
              확인
            </Button>
            <Button variant="secondary" type="submit" onClick={() => setIsAdding(false)}>
              취소
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default ProjectAddForm;
