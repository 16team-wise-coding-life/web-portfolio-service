import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

function ProjectCard({ project, setIsEditing, isEditable }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          {project.title}
          <br />
          <span className="text-muted">
            {`${project.description}`}
            <br />
            {`${project.from_date.split('T')[0]} ~ ${project.to_date.split('T')[0]}`}
          </span>
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
export default ProjectCard;
