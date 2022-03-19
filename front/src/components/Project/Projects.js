import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import ProjectAddForm from './ProjectAddForm';
import Project from './Project';

function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get('Projectlist', portfolioOwnerId).then(res => setProjects(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      <Card className='mt-2'>
        <Card.Body>
          <Card.Title>프로젝트</Card.Title>
          <Card.Text>
            {projects.map(project => (
              <Project key={project.id} project={project} setProjects={setProjects} isEditable={isEditable} />
            ))}
          </Card.Text>
          {isEditable && (
            <Row className='mt-3 text-center mb-4'>
              <Col sm='20'>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}
          {isAdding && <ProjectAddForm portfolioOwnerId={portfolioOwnerId} setProjects={setProjects} setIsAdding={setIsAdding} />}
        </Card.Body>
      </Card>
    </>
  );
}
export default Projects;
