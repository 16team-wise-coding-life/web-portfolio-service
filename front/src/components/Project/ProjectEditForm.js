import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as Api from '../../api';
import DatePicker from 'react-datepicker';

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
  const [form, setForm] = useState({
    title: currentProject.title,
    description: currentProject.description,
    from_date: new Date(currentProject.from_date),
    to_date: new Date(currentProject.to_date),
  });

  console.log('currentProject.from_date', currentProject.from_date);
  console.log('form.from_date', form.from_date);

  const handleSubmit = async e => {
    e.preventDefault();

    const { _id, user_id } = currentProject;

    // 날짜 정리 함수
    // const Cleandate = cleanDate => {
    //   return cleanDate.toISOString().split('T')[0];
    // };
    // const cleanFromDate = Cleandate(currentProject.from_date);
    // console.log('cleanFromDate', cleanFromDate);

    // const todate = Cleandate(currentProject.to_date);

    try {
      const res = await Api.put(`projects/${currentProject._id}`, {
        ...form,
      });
      console.log(res.data);
      setProjects({
        ...form,
        title: res.data.title,
        description: res.data.description,
        from_date: res.data.from_date,
        to_date: res.data.to_date,
      });

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='ProjectEditTitle' className='mt-3'>
        <Form.Control type='text' placeholder='프로젝트 이름' value={form.title} onChange={e => setForm(e.target.value)} />
      </Form.Group>
      <Form.Group controlId='ProjectEditMajor' className='mt-3'>
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
            <Button variant='secondary' type='submit' onClick={() => setIsEditing(false)}>
              취소
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
