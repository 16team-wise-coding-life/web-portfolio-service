import React from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

function AwardEditForm({ award, setAward, setIsEditing }) {
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // title, description 정보 서버에 보내서 변경하기 (PUT -> awards/:id)
      const res = await Api.put(`awards/${award.id}`, { title: award.title, description: award.description });
      console.log(res.data);
      setAward({
        ...award,
        title: res.data.title,
        description: res.data.description,
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='awardEditTitle'>
          <Form.Control type='text' placeholder='수상내역' value={award.title} onChange={e => setAward({ ...award, title: e.target.value })} />
        </Form.Group>

        <Form.Group controlId='awardEditDescription'>
          <Form.Control type='text' placeholder='상세내역' value={award.description} onChange={e => setAward({ ...award, description: e.target.value })} />
        </Form.Group>

        <Form.Group as={Row} className='mt-3 text-center'>
          <Col>
            <Button variant='primary' type='submit'>
              확인
            </Button>
            <Button variant='secondary' onClick={() => setIsEditing(false)}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}

export default AwardEditForm;
