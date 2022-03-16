import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as Api from '../../api';

const EducationAddForm = (portfolioOwnerId, setEducation, setIsAdding) => {
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const user_id = portfolioOwnerId;

    await Api.post('education/create', {
      user_id,
      school,
      major,
      position,
    });

    const res = await Api.get('educationlist', user_id);
    setEducation(res.data);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="educationAddSchool">
        <Form.Control type="text" placeholder="학교 이름" value={school} onChange={e => setSchool(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="educationAddMajor">
        <Form.Control type="text" placeholder="전공" value={major} onChange={e => setMajor(e.target.value)} />
      </Form.Group>

      <div key={`inline-radio`} className="mb-3 mt-3">
        <Form.Check inline label="재학중" id="radio-add1" type="radio" name="position" value="재학중" checked={position === '재학중'} onChange={e => setPosition(e.target.value)} />
        <Form.Check inline label="학사졸업" id="radio-add2" type="radio" name="position" value="학사졸업" checked={position === '학사졸업'} onChange={e => setPosition(e.target.value)} />
        <Form.Check inline label="석사졸업" id="radio-add3" type="radio" name="position" value="석사졸업" checked={position === '석사졸업'} onChange={e => setPosition(e.target.value)} />
        <Form.Check inline label="박사졸업" id="radio-add4" type="radio" name="position" value="박사졸업" checked={position === '박사졸업'} onChange={e => setPosition(e.target.value)} />
      </div>

      <Form.Group>
        <Row>
          <Col>
            <Button variant="primary" type="submit">
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
};

export default EducationAddForm;
