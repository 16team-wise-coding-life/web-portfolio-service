import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

function ProjectCard({ project, setIsEditing, isEditable }) {
  return (
    <Card.Text className='mb-2 mt-3'>
      <Row className='align-items-center'>
        <Col>
          {project.title}
          <br />
          <span className='text-muted'>
            {`${project.description}`}
            <br />
            {`${project.from_date.split('T')[0]} ~ ${project.to_date.split('T')[0]}`}
          </span>
        </Col>
        {isEditable && (
          <Col xs='auto' lg='1'>
            <Button className='mr-3' variant='outline-info' size='sm' onClick={() => setIsEditing(edit => !edit)}>
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}
export default ProjectCard;
