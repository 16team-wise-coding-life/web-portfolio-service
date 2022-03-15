import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import Award from './Award';
import AwardEditForm from './AwardEditForm';
import AwardAddForm from './AwardAddForm';

function Awards({ portfolioOwnerId, isEditable }) {
  /* useEffect로 portfolioOwnerId로 수상이력 GET -> awardlist/:user_id
  award를 res.data로 세팅하기
  const [awards, setAwards] = useState([]);
  */
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>수상이력</Card.Title>

          {/* props로 award, setIsEditing 넘기기
          isEditing이 true-> AwardEditForm
          false-> Award*/}
          {isEditing ? <AwardEditForm setIsEditing={setIsEditing} /> : <Award setIsEditing={setIsEditing} />}
          <Row className='mt-3 text-center mb-4'>
            <Col>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
          {isAdding && <AwardAddForm portfolioOwnerId={portfolioOwnerId} setIsAdding={setIsAdding} />}
        </Card.Body>
      </Card>
    </>
  );
}

export default Awards;
