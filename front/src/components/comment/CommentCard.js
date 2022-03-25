import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

function CommentCard({ comment, setIsEditing, isEditable, handleDeleteClick }) {
  return (
    // Body일까.. Text일까...
    <>
      <Card.Body>
        <Card.Text>
          <Row>
            <Col>
              <span>{comment.name}</span>
              <br />
              <span className="text-muted">{comment.content}</span>
            </Col>
            {isEditable && (
              <>
                <Col xs lg="1">
                  <Button variant="outline-info" size="sm" onClick={() => setIsEditing(true)}>
                    편집
                  </Button>
                </Col>
                <Col xs lg="1">
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(comment.id)}>
                    삭제
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Card.Text>
      </Card.Body>
    </>
  );
}

export default CommentCard;
