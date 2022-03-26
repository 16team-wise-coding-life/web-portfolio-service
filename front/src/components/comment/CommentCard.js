import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import moment from 'moment';

function CommentCard({ comment, setIsEditing, isEditable, handleDeleteClick }) {
  return (
    <>
      <Card.Body>
        <Card.Text>
          <Row>
            <Col>
              <span>{comment.name}</span>
              <dev style={{ color: 'grey' }}> / {moment(comment.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</dev>
              <br />
              <span className='text-muted'>{comment.content}</span>
            </Col>
            {isEditable && (
              <>
                <Col xs lg='1'>
                  <Button variant='outline-info' size='sm' className='mt-2' onClick={() => setIsEditing(true)}>
                    편집
                  </Button>
                </Col>
                <Col xs lg='1'>
                  <Button variant='outline-danger' size='sm' className='mt-2' onClick={() => handleDeleteClick(comment.id)}>
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
