import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function EducationEditForm() {
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [degree, setDegree] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="educationEditSchool">
        <Form.Control type="text" placeholder="학교 이름" value={school} onChange={e => setSchool(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="educationEditMajor">
        <Form.Control type="text" placeholder="전공" value={major} onChange={e => setMajor(e.target.value)} />
      </Form.Group>

      <div key={`inline-radio`} className="mb-3 mt-3">
        <Form.Check inline label="재학중" id="radio1" type="radio" name="position" value="재학중" checked={degree === '재학중'} onChange={e => setDegree(e.target.value)} />
        <Form.Check inline label="학사졸업" id="radio2" type="radio" name="position" value="학사졸업" checked={degree === '학사졸업'} onChange={e => setDegree(e.target.value)} />
        <Form.Check inline label="석사졸업" id="radio3" type="radio" name="position" value="석사졸업" checked={degree === '석사졸업'} onChange={e => setDegree(e.target.value)} />
        <Form.Check inline label="박사졸업" id="radio4" type="radio" name="position" value="박사졸업" checked={degree === '박사졸업'} onChange={e => setDegree(e.target.value)} />
      </div>
      <Button variant="primary" type="submit">
        확인
      </Button>
      <Button variant="secondary" type="submit">
        취소
      </Button>
    </Form>
  );
}

export default EducationEditForm;
