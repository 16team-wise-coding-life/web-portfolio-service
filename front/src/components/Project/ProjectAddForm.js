import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as Api from '../../api';
import DatePicker from 'react-datepicker';

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  const [tempProject, setTempProject] = useState({
    title: '',
    description: '',
    from_date: new Date(),
    to_date: new Date(),
  });

  const handleProjectValue = (name, value) => {
    setTempProject(prev => ({ ...prev, [name]: value }));
  };

  const handleCleandate = cleanDate => {
    return cleanDate.toISOString().split('T')[0];
  };

  const from_date = handleCleandate(tempProject.from_date);
  const to_date = handleCleandate(tempProject.to_date);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await Api.post('project/create', {
        user_id: portfolioOwnerId,
        from_date,
        to_date,
        ...tempProject,
      });
      setProjects(prev => [...prev, res.data]);
      setIsAdding(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='ProjectAddTitle' className='mt-3'>
        <Form.Control type='text' placeholder='프로젝트 이름' name='title' value={tempProject.title} onChange={e => handleProjectValue(e.target.name, e.target.value)} />
      </Form.Group>
      <Form.Group controlId='ProjectAddMajor' className='mt-3'>
        <Form.Control type='text' placeholder='상세내역' name='description' value={tempProject.description} onChange={e => handleProjectValue(e.target.name, e.target.value)} />
      </Form.Group>
      <Form.Group as={Row} className='mt-3'>
        <Col xs='auto'>
          <DatePicker selected={tempProject.from_date} name='from_date' dateFormat='yyyy-MM-dd' onChange={date => handleProjectValue('from_date', date)} />{' '}
        </Col>
        <Col xs='auto'>
          <DatePicker selected={tempProject.to_date} dateFormat='yyyy-MM-dd' name='to_date' onChange={date => handleProjectValue('to_date', date)} />
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
