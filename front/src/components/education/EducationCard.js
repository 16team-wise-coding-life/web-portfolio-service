import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

function EducationCard({ education, setIsEditing, isEditable }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{education.school}</span>
          <br />
          <span className="text-muted">{`${education.major} (${education.position})`}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button variant="outline-info" onClick={() => setIsEditing(edit => !edit)}>
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}
export default EducationCard;
