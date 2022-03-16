import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import Education from './Education';
import EducationAddForm from './EducationAddForm';

function Educations(portfolioOwnerId, isEditable) {
  const [educations, setEducation] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const {portfolioOwnerId: id} = portfolioOwnerId
    console.log('portfolioOwnerId', portfolioOwnerId);
    Api.get('educationlist', id).then(res => setEducation(res.data));
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
                <Button className="mt-3" onClick={() => setIsAdding(true)}>
                  +
                </Button>
              </Col>
            </Row>
          )}
          {isAdding && <EducationAddForm portfolioOwnerId={portfolioOwnerId} setIsAdding={setIsAdding} setEducation={setEducation}></EducationAddForm>}
        </Card.Body>
      </Card>
    </>
  );
}
export default Educations;
