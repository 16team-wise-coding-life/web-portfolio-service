import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

function CommentCard({ comment, setIsEditing, isEditable, setIsDeleted }) {
  // TODO : handleDeleteClick을 어디에 둘것인가?
  const handleDeleteClick = async () => {
    try {
      await Api.delete(`freeboard/comments/${comment.id}`);
      setIsDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Body일까.. Text일까...
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
                <Button variant="outline-danger" size="sm" onClick={handleDeleteClick}>
                  삭제
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Card.Text>
    </Card.Body>
  );
}

export default CommentCard;
