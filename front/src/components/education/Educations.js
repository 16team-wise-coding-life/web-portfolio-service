import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import Education from './Education';
import EducationAddForm from './EducationAddForm';

const Educations = (portfolioOwnerId, isEditable) => {
  const [isAdding, setIsAdding] = useState(false);
  const [educations, setEducation] = useState([]);

  useEffect(() => {
    Api.get('educationlist', portfolioOwnerId).then(res => setEducation(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>학력</Card.Title>
          <Card.Text>
            {educations.map(education => (
              <Education key={education.id} setEducation={setEducation} isEditable={isEditable} />
            ))}
          </Card.Text>

          {isEditable && (
            <Row>
              <Col>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}
          {isAdding && <EducationAddForm portfolioOwnerId={portfolioOwnerId} setIsAdding={setIsAdding} setEducation={setEducation}></EducationAddForm>}
        </Card.Body>
      </Card>
    </>
  );
};
export default Educations;
