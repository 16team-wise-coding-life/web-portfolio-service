import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as Api from '../../api';

function CommentEditForm({ comment, setComment, setIsEditing }) {
  const { content, id: commentId } = comment;
  const [tempComment, setTempComment] = useState({ content });

  const handleCommentValue = (name, value) => {
    setTempComment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await Api.put(`freeboard/comments/${commentId}`, tempComment);
      setComment(prev => ({
        ...prev,
        ...data,
      }));
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='mt-3'>
      <Form.Group className='mb-3' controlId='commentAdd'>
        <Form.Label>{comment.name}</Form.Label>
        <Form.Control as='textarea' rows={3} value={tempComment.content} onChange={e => handleCommentValue('content', e.target.value)} />
      </Form.Group>
      <Form.Group className='mt-3 text-center'>
        <Button variant='primary' type='submit' className='me-2'>
          수정
        </Button>
      </Form.Group>
    </Form>
  );
}

export default CommentEditForm;
