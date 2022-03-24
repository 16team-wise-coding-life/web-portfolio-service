import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as Api from '../../api';

function EducationEditForm({ currentEducation, setEducations, setIsEditing }) {
  const [form, setForm] = useState({
    school: currentEducation.school,
    major: currentEducation.major,
    position: currentEducation.position,
  });

  const handleEducationEdit = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const positions = ['재학중', '학사졸업', '석사졸업', '박사졸업'];

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (window.confirm('학력을 수정하시겠습니까?')) {
        const res = await Api.put(`educations/${currentEducation._id}`, {
          _id: currentEducation._id,
          ...form,
        });
        console.log(res.data);
        await Api.get('educationlist', currentEducation._id);
        setEducations(prev => [...prev, { ...res.data }]);
        setIsEditing(false);
      }
    } catch (error) {
      alert('학력을 수정하지 못했습니다.', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='educationEditSchool' className='mt-3'>
        <Form.Control type='text' placeholder='학교 이름' name='school' value={form.school} onChange={e => handleEducationEdit(e.target.name, e.target.value)} />
      </Form.Group>
      <Form.Group controlId='educationEditMajor' className='mt-3'>
        <Form.Control type='text' placeholder='전공' name='major' value={form.major} onChange={e => handleEducationEdit(e.target.name, e.target.value)} />
      </Form.Group>

      <div key={`inline-radio`} className='mb-3 mt-3'>
        {positions.map(position => (
          <Form.Check inline label={position} type='radio' name='position' value={position} checked={form.position === position} onChange={e => handleEducationEdit(e.target.name, e.target.value)} />
        ))}
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
