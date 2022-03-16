import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

function EducationCard({ education, setIsEditing, isEditable }) {
  return (
    <Card.Text>
      <Row>
        <Col>
          <span>{education.school}</span>
          <br />
          <span className="text-muted">{`${education.major} ${education.value}`}</span>
        </Col>
        {isEditable && (
          <Col>
            <Button variant="outline-info" onClick={() => setIsEditing(a => !a)}>
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}
export default EducationCard;
