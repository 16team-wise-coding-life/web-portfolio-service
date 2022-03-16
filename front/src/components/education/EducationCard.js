import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

const EducationCard = () => {
  return (
    <Card.Text>
      <Row>
        <Col>
          <span>//학교명</span>
          <br />
          <span className="text-muted">//전공, 현재상태</span>
        </Col>
        <Col>
          <Button variant="outline-info">편집</Button>
        </Col>
      </Row>
    </Card.Text>
  );
};
export default EducationCard;
