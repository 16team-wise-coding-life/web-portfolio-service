import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as Api from '../../api';

function EducationEditForm({ currentEducation, setEducations, setIsEditing }) {
  const [school, setSchool] = useState(currentEducation.school);
  const [major, setMajor] = useState(currentEducation.major);
  const [position, setPosition] = useState(currentEducation.position);

  const handleSubmit = async e => {
    e.preventDefault();

    const user_id = currentEducation.user_id;
    console.log('user_id', user_id);
    await Api.put(`educations/${currentEducation._id}`, {
      school,
      major,
      position,
    });

    await Api.get('educationlist', user_id).then(res => setEducations(res.data));
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='educationEditSchool' className='mt-3'>
        <Form.Control type='text' placeholder='학교 이름' value={school} onChange={e => setSchool(e.target.value)} />
      </Form.Group>
      <Form.Group controlId='educationEditMajor' className='mt-3'>
        <Form.Control type='text' placeholder='전공' value={major} onChange={e => setMajor(e.target.value)} />
      </Form.Group>

      <div key={`inline-radio`} className='mb-3 mt-3'>
        <Form.Check inline label='재학중' id='radio-edit1' type='radio' name='position' value='재학중' checked={position === '재학중'} onChange={e => setPosition(e.target.value)} />
        <Form.Check inline label='학사졸업' id='radio-edit2' type='radio' name='position' value='학사졸업' checked={position === '학사졸업'} onChange={e => setPosition(e.target.value)} />
        <Form.Check inline label='석사졸업' id='radio-edit3' type='radio' name='position' value='석사졸업' checked={position === '석사졸업'} onChange={e => setPosition(e.target.value)} />
        <Form.Check inline label='박사졸업' id='radio-edit4' type='radio' name='position' value='박사졸업' checked={position === '박사졸업'} onChange={e => setPosition(e.target.value)} />
      </div>

      <Form.Group as={Row} className='mt-3 text-center'>
        <Row>
          <Col sm='20'>
            <Button variant='primary' type='submit' className='me-2'>
              확인
            </Button>
            <Button variant='secondary' onClick={() => setIsEditing(false)}>
              취소
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default EducationEditForm;
