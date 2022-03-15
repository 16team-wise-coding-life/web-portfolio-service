import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import Education from './Education';
import EducationCard from './EducationCard';
import EducationEditForm from './EducationEditForm';

const Educations = (portfolioOwnerId, isEditable) => {
  const [isEditing, setIsEditing] = useState(false);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    Api.get('educationlist', portfolioOwnerId).then(res => setEducation(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>학력</Card.Title>
          <Card.Text>
            // 학력 리스트
            {education.map(education => (
              <Education key={education.id} setEducation={setEducation} isEditable={isEditable} />
            ))}
            // 추가 폼 들어갈 자리
          </Card.Text>
          <Row>
            <Col>
              <Button></Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
export default Educations;
