import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as Api from '../../api';
import DatePicker from 'react-datepicker';

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
  const [title, setTitle] = useState(currentProject.title);
  const [description, setDescription] = useState(currentProject.description);
  const [fromDate, setFromDate] = useState(new Date(currentProject.from_date));
  const [toDate, setToDate] = useState(new Date(currentProject.to_date));

  const handleSubmit = async e => {
    e.preventDefault();

    const user_id = currentProject.user_id;
    console.log('user_id', user_id);

    const from_date = fromDate.toISOString().split('T')[0];
    const to_date = toDate.toISOString().split('T')[0];

    await Api.put(`projects/${currentProject.user_id}`, {
      user_id,
      title,
      description,
      from_date,
      to_date,
    });

    await Api.get('projectlist', user_id).then(res => setProjects(res.data));
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="ProjectEditTitle" className="mt-3">
        <Form.Control type="text" placeholder="프로젝트 이름" value={title} onChange={e => setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="ProjectEditMajor" className="mt-3">
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
            <Button variant="secondary" type="submit" onClick={() => setIsEditing(false)}>
              취소
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
