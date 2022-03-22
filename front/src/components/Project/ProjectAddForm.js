import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as Api from '../../api';
import DatePicker from 'react-datepicker';

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  const [form, setForm] = useState({ title: '', description: '', from_date: new Date(), to_date: new Date() });

  const handleSubmit = async e => {
    e.preventDefault();

    const user_id = portfolioOwnerId;

    const Cleandate = cleanDate => {
      return cleanDate.toISOString().split('T')[0];
    };
    const fromdate = Cleandate(form.from_date);
    const todate = Cleandate(form.to_date);

    try {
      await Api.post('project/create', {
        ...form,
        fromdate,
        todate,
      });

      await Api.get('Projectlist', user_id).then(res => setProjects(res.data));
      setIsAdding(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='ProjectAddTitle' className='mt-3'>
        <Form.Control type='text' placeholder='프로젝트 이름' value={form.title} onChange={e => setForm(e.target.value)} />
      </Form.Group>
      <Form.Group controlId='ProjectAddMajor' className='mt-3'>
        <Form.Control type='text' placeholder='상세내역' value={form.description} onChange={e => setForm(e.target.value)} />
      </Form.Group>
      <Form.Group as={Row} className='mt-3'>
        <Col xs='auto'>
          <DatePicker selected={form.from_date} dateFormat='yyyy-MM-dd' onChange={date => setForm(date)} />{' '}
        </Col>
        <Col xs='auto'>
          <DatePicker selected={form.to_date} dateFormat='yyyy-MM-dd' onChange={date => setForm(date)} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className='mt-3 text-center'>
        <Row>
          <Col sm='20'>
            <Button variant='primary' type='submit' className='me-2'>
              확인
            </Button>
            <Button variant='secondary' type='submit' onClick={() => setIsAdding(false)}>
              취소
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default ProjectAddForm;
